# PDF Form Filling Guide

## Reading Form Fields

```python
from pypdf import PdfReader

reader = PdfReader("form.pdf")
fields = reader.get_fields()
for name, field in fields.items():
    print(f"{name}: type={field.get('/FT')}, value={field.get('/V')}")
```

## Filling Forms with pypdf

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("form.pdf")
writer = PdfWriter()
writer.append(reader)

# Fill fields
writer.update_page_form_field_values(
    writer.pages[0],
    {
        "employee_name": "John Smith",
        "department": "Engineering",
        "date": "2026-01-15",
    }
)

writer.write("filled_form.pdf")
writer.close()
```

## Filling with Checkboxes and Radio Buttons

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("form.pdf")
writer = PdfWriter()
writer.append(reader)

writer.update_page_form_field_values(
    writer.pages[0],
    {
        "agree_terms": "/Yes",       # Checkbox
        "priority": "/High",         # Radio button
        "comments": "Approved",      # Text field
    }
)

writer.write("filled.pdf")
writer.close()
```

## Flattening Forms (Make Non-Editable)

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("filled_form.pdf")
writer = PdfWriter()
writer.append(reader)

# Flatten all form fields
for page in writer.pages:
    for annot in page.get("/Annots", []):
        annot.get_object().update({"/Ff": 1})

writer.write("flattened.pdf")
writer.close()
```

## Generating a Filled PDF from Scratch (reportlab)

Use `scripts/fill_form.py` for overlay-based form filling when pypdf can't handle complex forms:

```python
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from pypdf import PdfReader, PdfWriter
import io

def fill_overlay(template_path, output_path, field_positions):
    """
    field_positions: dict of {field_name: (x, y, value)}
    """
    reader = PdfReader(template_path)
    writer = PdfWriter()

    # Create overlay with text at positions
    packet = io.BytesIO()
    c = canvas.Canvas(packet, pagesize=letter)
    c.setFont("Helvetica", 10)
    for name, (x, y, value) in field_positions.items():
        c.drawString(x, y, str(value))
    c.save()
    packet.seek(0)

    # Merge overlay onto first page
    overlay = PdfReader(packet)
    page = reader.pages[0]
    page.merge_page(overlay.pages[0])
    writer.add_page(page)

    # Copy remaining pages
    for p in reader.pages[1:]:
        writer.add_page(p)

    writer.write(output_path)
    writer.close()
```

## Common Field Types

| Type | `/FT` Value | Fill With |
| ------ | ------------ | ----------- |
| Text | `/Tx` | String value |
| Checkbox | `/Btn` | `/Yes` or `/Off` |
| Radio | `/Btn` | `/OptionName` |
| Dropdown | `/Ch` | Option string |
| Signature | `/Sig` | (requires pkcs7) |

## Troubleshooting

- **Fields not visible after filling**: Some PDFs require `/NeedAppearances` set to `True`
- **AcroForm not found**: PDF may use XFA forms (not supported by pypdf)
- **Values don't persist**: Ensure you write to a new file, not the source
