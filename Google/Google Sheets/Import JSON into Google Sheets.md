# How to import JSON into Google Sheets

Original source: https://support.geckoboard.com/hc/en-us/articles/360006412678-Import-JSON-data-to-a-Google-Sheet

1. Create a new Google Sheet
2. Click on the Tools menu and select the option Script editor.
3. Delete the placeholder content.
4. Copy and paste the code [from this script](https://gist.github.com/paulgambill/cacd19da95a1421d3164) to the Script editor
5. Select File > Save
6. Name your code(aka Project as of 2020) "ImportJSON"
7. Close the Script editor and navigate back to your Google Sheet
8. In cell A1, type =ImportJSON("xxx"). Replace xxx with your API endpoint.
9. Press enter. Your Google Sheet should now populate with your JSON data

I forked a copy of the script in case it later gets removed - [here is my forked copy of v 1.1 as of 2020-04-17](https://gist.github.com/bigtoga/1f66c125e1133e0650c64c47a0863790)
