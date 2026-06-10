---
name: xlsx
description: Use this skill any time a spreadsheet file is the primary input or output. This means any task where the user wants to open, read, edit, or fix an existing .xlsx, .xlsm, .csv, or .tsv file; create a new spreadsheet from scratch or from other data sources; or convert between tabular file formats.
---

# XLSX Creation, Editing, and Analysis

## Overview

A user may ask you to create, edit, or analyze the contents of an .xlsx file.
You have different tools and workflows available for different tasks.

## Reading and Analyzing Data

### Data analysis with pandas

```python
import pandas as pd

# Read Excel
df = pd.read_excel('file.xlsx')  # Default: first sheet
all_sheets = pd.read_excel('file.xlsx', sheet_name=None)  # All sheets as dict

# Analyze
df.head()      # Preview data
df.info()      # Column info
df.describe()  # Statistics

# Write Excel
df.to_excel('output.xlsx', index=False)
```

## CRITICAL: Use Formulas, Not Hardcoded Values

Always use Excel formulas instead of calculating values in Python and hardcoding them.

### WRONG - Hardcoding

```python
# Bad: Calculating in Python and hardcoding result
total = df['Sales'].sum()
sheet['B10'] = total  # Hardcodes 5000
```

### CORRECT - Using Excel Formulas

```python
# Good: Let Excel calculate the sum
sheet['B10'] = '=SUM(B2:B9)'
sheet['C5'] = '=(C4-C2)/C2'
sheet['D20'] = '=AVERAGE(D2:D19)'
```

## Common Workflow

1. Choose tool: pandas for data, openpyxl for formulas/formatting
2. Create/Load: Create new workbook or load existing file
3. Modify: Add/edit data, formulas, and formatting
4. Save: Write to file
5. Recalculate formulas (if using formulas): Use `scripts/recalc.py`
6. Verify and fix any errors

### Creating New Excel Files

```python
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment

wb = Workbook()
sheet = wb.active

# Add data
sheet['A1'] = 'Hello'
sheet['B1'] = 'World'
sheet.append(['Row', 'of', 'data'])

# Add formula
sheet['B2'] = '=SUM(A1:A10)'

# Formatting
sheet['A1'].font = Font(bold=True, color='FF0000')
sheet['A1'].fill = PatternFill('solid', start_color='FFFF00')
sheet['A1'].alignment = Alignment(horizontal='center')

# Column width
sheet.column_dimensions['A'].width = 20

wb.save('output.xlsx')
```

### Editing Existing Files

```python
from openpyxl import load_workbook

wb = load_workbook('existing.xlsx')
sheet = wb.active  # or wb['SheetName']

# Working with multiple sheets
for sheet_name in wb.sheetnames:
    sheet = wb[sheet_name]

# Modify cells
sheet['A1'] = 'New Value'
sheet.insert_rows(2)
sheet.delete_cols(3)

# Add new sheet
new_sheet = wb.create_sheet('NewSheet')
new_sheet['A1'] = 'Data'

wb.save('modified.xlsx')
```

## Recalculating Formulas

Excel files created by openpyxl contain formulas as strings but not calculated values. Use the provided `scripts/recalc.py` script:

```bash
python scripts/recalc.py <excel_file> [timeout_seconds]
```

The script:
- Automatically sets up LibreOffice macro on first run
- Recalculates all formulas in all sheets
- Scans ALL cells for Excel errors (#REF!, #DIV/0!, etc.)
- Returns JSON with detailed error locations and counts

### Interpreting recalc.py Output

```json
{
  "status": "success",
  "total_errors": 0,
  "total_formulas": 42,
  "error_summary": {
    "#REF!": {
      "count": 2,
      "locations": ["Sheet1!B5", "Sheet1!C10"]
    }
  }
}
```

## Best Practices

### Library Selection

- **pandas**: Best for data analysis, bulk operations, and simple data export
- **openpyxl**: Best for complex formatting, formulas, and Excel-specific features

### Working with openpyxl

- Cell indices are 1-based (row=1, column=1 = A1)
- Use `data_only=True` to read calculated values: `load_workbook('file.xlsx', data_only=True)`
- Warning: If opened with `data_only=True` and saved, formulas are replaced with values
- For large files: Use `read_only=True` for reading or `write_only=True` for writing

### Working with pandas

- Specify data types: `pd.read_excel('file.xlsx', dtype={'id': str})`
- Read specific columns: `pd.read_excel('file.xlsx', usecols=['A', 'C', 'E'])`
- Handle dates: `pd.read_excel('file.xlsx', parse_dates=['date_column'])`

## Formula Verification Checklist

### Essential Verification

- Test 2-3 sample references before building full model
- Column mapping: Confirm Excel columns match (column 64 = BL, not BK)
- Row offset: Excel rows are 1-indexed (DataFrame row 5 = Excel row 6)

### Common Pitfalls

- NaN handling: Check for null values with `pd.notna()`
- Division by zero: Check denominators before using `/` in formulas
- Wrong references: Verify all cell references point to intended cells
- Cross-sheet references: Use correct format (`Sheet1!A1`)

## Requirements for All Excel Files

- Use a consistent, professional font (e.g., Arial, Times New Roman)
- Every Excel model MUST be delivered with ZERO formula errors
- When modifying existing files, EXACTLY match existing format and conventions

## Code Style

- Write minimal, concise Python code without unnecessary comments
- Avoid verbose variable names and redundant operations
- Avoid unnecessary print statements
