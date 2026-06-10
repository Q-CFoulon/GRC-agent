# PDF Processing API Reference

## pdfplumber

### Opening Files

```python
import pdfplumber

pdf = pdfplumber.open("file.pdf")         # From path
pdf = pdfplumber.open(file_like_object)   # From BytesIO
```

### PDF Object

| Property/Method | Returns | Description |
| ---------------- | --------- | ------------- |
| `pdf.pages` | list[Page] | All pages |
| `pdf.metadata` | dict | Document metadata |
| `pdf.close()` | None | Close file handle |

### Page Object

| Property/Method | Returns | Description |
| ---------------- | --------- | ------------- |
| `page.extract_text()` | str or None | Full page text |
| `page.extract_tables()` | list[list[list]] | All tables |
| `page.extract_words()` | list[dict] | Words with positions |
| `page.chars` | list[dict] | Individual characters |
| `page.lines` | list[dict] | Line objects |
| `page.rects` | list[dict] | Rectangle objects |
| `page.width` | float | Page width in pts |
| `page.height` | float | Page height in pts |
| `page.page_number` | int | 1-indexed page number |
| `page.crop(bbox)` | Page | Crop to bounding box |
| `page.within_bbox(bbox)` | Page | Filter within bbox |

### Table Settings

```python
table_settings = {
    "vertical_strategy": "lines",     # "lines", "text", "explicit"
    "horizontal_strategy": "lines",
    "snap_tolerance": 3,
    "join_tolerance": 3,
    "edge_min_length": 3,
    "min_words_vertical": 3,
    "min_words_horizontal": 1,
}
tables = page.extract_tables(table_settings)
```

## pypdf

### PdfReader

```python
from pypdf import PdfReader

reader = PdfReader("file.pdf")
reader = PdfReader(file_like_object)
```

| Property/Method | Returns | Description |
| ---------------- | --------- | ------------- |
| `reader.pages` | list[PageObject] | All pages |
| `reader.metadata` | DocumentInformation | PDF metadata |
| `reader.is_encrypted` | bool | Encryption status |
| `reader.get_fields()` | dict | Form fields |
| `reader.named_destinations` | dict | Named destinations |
| `reader.outline` | list | Bookmarks/TOC |

### PdfWriter

```python
from pypdf import PdfWriter

writer = PdfWriter()
```

| Method | Description |
| -------- | ------------- |
| `writer.add_page(page)` | Add a page |
| `writer.append(reader_or_path)` | Append entire PDF |
| `writer.write(output)` | Write to file/stream |
| `writer.close()` | Close and flush |
| `writer.add_metadata(dict)` | Set metadata |
| `writer.encrypt(password)` | Encrypt output |
| `writer.update_page_form_field_values(page, fields)` | Fill form |

### PageObject

| Method | Description |
| -------- | ------------- |
| `page.extract_text()` | Extract text |
| `page.merge_page(other)` | Overlay another page |
| `page.rotate(angle)` | Rotate page (90, 180, 270) |
| `page.scale(sx, sy)` | Scale page |
| `page.mediabox` | Page dimensions |

## reportlab (PDF Generation)

### Canvas Basics

```python
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.units import inch, cm

c = canvas.Canvas("output.pdf", pagesize=letter)
c.setFont("Helvetica", 12)
c.drawString(72, 720, "Hello World")  # x, y from bottom-left
c.showPage()  # New page
c.save()
```

### Common Fonts

`Helvetica`, `Helvetica-Bold`, `Times-Roman`, `Times-Bold`, `Courier`, `Courier-Bold`

### Coordinate System

- Origin (0,0) is bottom-left
- Units are points (72 points = 1 inch)
- Use `from reportlab.lib.units import inch, cm, mm` for convenience
