import tabula
import pandas as pd

# Read pdf into DataFrame
df = tabula.read_pdf("test.pdf", options)

# Read remote pdf into DataFrame
df2 = tabula.read_pdf("https://github.com/tabulapdf/tabula-java/raw/master/src/test/resources/technology/tabula/arabic.pdf")

# convert PDF into CSV
tabula.convert_into("test.pdf", "output.csv", output_format="csv")

# convert all PDFs in a directory
tabula.convert_into_by_batch("input_directory", output_format='csv')
