---
name: pdf-processing
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
---

# PDF Processing

## Quick Start

Use pdfplumber to extract text from PDFs:

```python
import pdfplumber

with pdfplumber.open("document.pdf") as pdf:
    text = pdf.pages[0].extract_text()
```

For advanced form filling, see [FORMS.md](FORMS.md).

## Overview

This skill handles all PDF operations: text extraction, table extraction, form filling, merging, splitting, and metadata reading.

## Reading and Extracting

### Text Extraction with pdfplumber

```python
import pdfplumber

with pdfplumber.open("document.pdf") as pdf:
    # Single page
    text = pdf.pages[0].extract_text()

    # All pages
    full_text = "\n".join(page.extract_text() or "" for page in pdf.pages)

    # Page count
    print(f"Pages: {len(pdf.pages)}")
```

### Table Extraction

```python
import pdfplumber

with pdfplumber.open("report.pdf") as pdf:
    page = pdf.pages[0]
    tables = page.extract_tables()
    for table in tables:
        for row in table:
            print(row)
```

### Convert Tables to DataFrame

```python
import pdfplumber
import pandas as pd

with pdfplumber.open("report.pdf") as pdf:
    table = pdf.pages[0].extract_tables()[0]
    df = pd.DataFrame(table[1:], columns=table[0])
```

### Extract with Layout Awareness

```python
import pdfplumber

with pdfplumber.open("multi-column.pdf") as pdf:
    page = pdf.pages[0]
    # Extract words with position info
    words = page.extract_words()
    for w in words[:10]:
        print(f"{w['text']} at ({w['x0']:.0f}, {w['top']:.0f})")
```

## Merging and Splitting

### Merge PDFs

```python
from pypdf import PdfWriter

writer = PdfWriter()
for path in ["doc1.pdf", "doc2.pdf", "doc3.pdf"]:
    writer.append(path)
writer.write("merged.pdf")
writer.close()
```

### Split PDF

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("large.pdf")
for i, page in enumerate(reader.pages):
    writer = PdfWriter()
    writer.add_page(page)
    writer.write(f"page_{i+1}.pdf")
    writer.close()
```

### Extract Page Range

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("document.pdf")
writer = PdfWriter()
for page in reader.pages[2:5]:  # Pages 3-5 (0-indexed)
    writer.add_page(page)
writer.write("extract.pdf")
writer.close()
```

## Metadata

```python
from pypdf import PdfReader

reader = PdfReader("document.pdf")
meta = reader.metadata
print(f"Title: {meta.title}")
print(f"Author: {meta.author}")
print(f"Pages: {len(reader.pages)}")
print(f"Encrypted: {reader.is_encrypted}")
```

## Dependencies

```
pip install pdfplumber pypdf
# For form filling:
pip install reportlab
```

## Library Selection

| Task | Library |
|------|---------|
| Text extraction | pdfplumber |
| Table extraction | pdfplumber |
| Merge/split/metadata | pypdf |
| Form filling | pypdf + reportlab |
| PDF generation | reportlab |

## Code Style

- Write minimal, concise Python without unnecessary comments
- Always close writers after saving
- Use context managers (`with`) for pdfplumber
- Handle None returns from `extract_text()` gracefully
