"""PDF Form Fill Utility

Fills a PDF form template using either field-based filling (pypdf)
or overlay-based filling (reportlab) for complex forms.

Usage:
    python fill_form.py <template.pdf> <output.pdf> <data.json>

data.json format for field-based:
    {"field_name": "value", ...}

data.json format for overlay-based:
    {"_overlay": true, "fields": {"name": {"x": 100, "y": 700, "value": "text"}}}
"""

import json
import sys
import io
from pathlib import Path

from pypdf import PdfReader, PdfWriter


def fill_fields(template_path: str, output_path: str, data: dict) -> None:
    """Fill PDF form fields by name."""
    reader = PdfReader(template_path)
    writer = PdfWriter()
    writer.append(reader)

    for page in writer.pages:
        writer.update_page_form_field_values(page, data)

    writer.write(output_path)
    writer.close()


def fill_overlay(template_path: str, output_path: str, fields: dict) -> None:
    """Fill PDF by overlaying text at coordinates."""
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import letter

    reader = PdfReader(template_path)
    writer = PdfWriter()

    packet = io.BytesIO()
    c = canvas.Canvas(packet, pagesize=letter)
    c.setFont("Helvetica", 10)

    for name, props in fields.items():
        x = props["x"]
        y = props["y"]
        value = str(props["value"])
        font_size = props.get("font_size", 10)
        c.setFont("Helvetica", font_size)
        c.drawString(x, y, value)

    c.save()
    packet.seek(0)

    overlay = PdfReader(packet)
    page = reader.pages[0]
    page.merge_page(overlay.pages[0])
    writer.add_page(page)

    for p in reader.pages[1:]:
        writer.add_page(p)

    writer.write(output_path)
    writer.close()


def main():
    if len(sys.argv) != 4:
        print(f"Usage: {sys.argv[0]} <template.pdf> <output.pdf> <data.json>")
        sys.exit(1)

    template = sys.argv[1]
    output = sys.argv[2]
    data_path = sys.argv[3]

    if not Path(template).exists():
        print(f"Error: Template not found: {template}")
        sys.exit(1)

    with open(data_path) as f:
        data = json.load(f)

    if data.get("_overlay"):
        fill_overlay(template, output, data["fields"])
    else:
        fill_fields(template, output, data)

    print(f"Filled form saved to: {output}")


if __name__ == "__main__":
    main()
