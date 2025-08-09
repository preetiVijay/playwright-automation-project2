# Playwright Automation Project - Practice

## Project Description
This project demonstrates the use of the Playwright testing framework for UI and API Testing. It includes sample test cases for calendar validation, Excel file upload/download, and API utilities for authentication and order creation.

## Prerequisites
- Node.js (v16 or above recommended)
- npm (Node Package Manager)
- Playwright
- ExcelJS

## Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd playwright-automation-project2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## Running Tests

- **Run all tests:**
  ```bash
  npx playwright test
  ```

- **Run a specific test file:**
  ```bash
  npx playwright test tests/Calendar.spec.js
  ```

- **View HTML report:**
  ```bash
  npx playwright show-report
  ```

## Project Structure

```
playwright-automation-project2/
├── tests/
│   ├── Calendar.spec.js
│   ├── UploadDownloadExcel.spec.js
│   ├── utils/
│   │   └── APIUtils.js
│   └── ...other spec files
├── playwright.config.js
├── package.json
└── README.md
```

## Key Features

- **Calendar Validation:** Automated date selection and verification.
- **API Utilities:** Helper functions for authentication and order creation.
- **Excel Upload/Download:** Download, modify, and upload Excel files using Playwright and ExcelJS.
- **Cross-browser Testing:** Configured for Firefox (can enable Chromium/WebKit as needed).
- **Retries & Trace:** Configured for flaky test handling and trace collection.

## Troubleshooting

- If tests are flaky, increase timeouts or use Playwright’s built-in waiting mechanisms.
- Ensure all dependencies are installed.
- For Excel tests, make sure the file paths are correct and accessible.

## Contributing

Feel free to submit issues or pull requests for improvements!