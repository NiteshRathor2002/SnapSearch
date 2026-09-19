# 🔎 SnapSearch

**SnapSearch** is a privacy-focused, local-first image search engine that helps you find specific images from your personal photo collection based on the **text contained within those images**.

Have you ever taken a photo of a receipt, document, ID card, study note, invoice, or whiteboard and later struggled to find it among hundreds or thousands of other images?

**SnapSearch solves that problem.**

Instead of manually browsing through your image collection, simply select a local folder and let SnapSearch scan your images using **in-browser Optical Character Recognition (OCR)**. Once the text has been extracted, you can instantly search for words, names, numbers, invoice details, or any other text contained within your images.

> 🔐 **Your images never leave your device.**

---

## ✨ Features

### 🔍 Search Images by Text

Search your entire image collection using the text found inside your images.

For example, search for:

* `invoice`
* `receipt`
* `John`
* `₹2500`
* `2026`
* `phone number`
* `student ID`
* `project report`

SnapSearch instantly filters the image collection to show matching results.

### 🧠 In-Browser OCR

SnapSearch uses Optical Character Recognition to extract text directly from your images.

The OCR processing happens entirely inside your browser, allowing the application to work without sending your images to external servers.

### 🔐 Privacy First

Privacy is one of the core principles behind SnapSearch.

Your images and extracted OCR data are **not uploaded to a backend server, cloud storage, or third-party API**.

Everything stays on your device.

```text
Your Images
     │
     ▼
┌───────────────┐
│   SnapSearch  │
│   Web Browser │
└───────┬───────┘
        │
        ▼
    Local OCR
        │
        ▼
 Extracted Text
        │
        ▼
     IndexedDB
        │
        ▼
 Instant Search
```

### 💾 Local Storage

Extracted OCR metadata is stored locally using browser storage technologies such as **IndexedDB**.

This allows SnapSearch to avoid repeatedly processing the same images and provides fast local searching.

### 🖼️ Image Preview

Click any search result to open a focused image preview.

The preview allows you to:

* View the original image
* Inspect the image in high resolution
* Download the source image
* Quickly return to the search results

### ⚡ Fast Search

Once your images have been indexed, searching happens locally without network requests.

Results can be filtered immediately as you type.

### 📱 Responsive Interface

SnapSearch is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile devices

The interface focuses on a clean and distraction-free experience.

---

## 🛠️ Tech Stack

| Technology              | Purpose                        |
| ----------------------- | ------------------------------ |
| React                   | User interface                 |
| JavaScript / TypeScript | Application logic              |
| Tailwind CSS            | Styling and responsive UI      |
| OCR Engine              | Extract text from images       |
| IndexedDB               | Local OCR metadata storage     |
| Browser File APIs       | Access local image collections |
| Vite                    | Development and build tooling  |

---

## 🏗️ How SnapSearch Works

### 1. Select Your Image Collection

The user selects a local folder containing their images.

```text
📁 My Photos
 ├── receipt.jpg
 ├── invoice.png
 ├── notes.jpg
 ├── document.jpeg
 └── id-card.png
```

### 2. SnapSearch Processes the Images

The application reads the selected images directly in the browser.

No image is uploaded to a server.

### 3. OCR Extracts Text

The OCR engine analyzes each image and extracts the visible text.

For example:

```text
invoice.jpg

"Invoice #INV-2026
Customer: Nitesh
Total: ₹2,500"
```

The extracted text is associated with the corresponding image.

### 4. Metadata Is Stored Locally

The OCR results and required metadata are stored locally using IndexedDB.

Conceptually:

```text
Image
 ├── File information
 ├── Image identifier
 └── OCR text
```

### 5. Search the Collection

The user can search:

```text
invoice
```

SnapSearch searches the locally stored OCR text and finds matching images.

```text
🔎 invoice

┌────────────┐
│ invoice.jpg│
└────────────┘

┌────────────┐
│ invoice2.png│
└────────────┘
```

### 6. Preview the Image

Selecting a result opens the original image in a preview modal.

---

## 🔒 Privacy Architecture

SnapSearch follows a **local-first architecture**.

Unlike traditional image-search applications, there is no requirement for a backend that receives or stores the user's images.

### Traditional Architecture

```text
User
 │
 ▼
Upload Image
 │
 ▼
Server
 │
 ├── Store Image
 ├── Run OCR
 └── Store Text
 │
 ▼
Search Results
```

### SnapSearch Architecture

```text
User
 │
 ▼
Local Image
 │
 ▼
Browser
 │
 ├── OCR Processing
 │
 └── IndexedDB
       │
       ▼
   Local Search
```

This architecture minimizes the exposure of potentially sensitive information contained within personal images.

---

## 🎯 Use Cases

SnapSearch can be useful for anyone who maintains a large collection of images containing important text.

### 🎓 Students

Find photos of:

* Lecture notes
* Whiteboards
* Assignments
* Study material
* Textbook pages

### 💼 Professionals

Search through:

* Receipts
* Invoices
* Business documents
* Meeting notes
* Reference documents

### 🧾 Personal Documents

Quickly locate images containing:

* IDs
* Bills
* Warranty information
* Addresses
* Phone numbers
* Confirmation numbers

---

## ⚡ Performance Philosophy

SnapSearch is designed around three principles:

### Local Processing

OCR processing happens directly in the browser whenever possible.

### Local Storage

Processed metadata is stored locally so previously indexed images don't need to be unnecessarily processed again.

### Instant Search

Once indexing is complete, searching operates against locally stored OCR metadata rather than repeatedly communicating with a remote server.

---

## 🔐 Privacy Philosophy

SnapSearch is built around a simple principle:

> **Your personal photos should remain yours.**

Personal images can contain extremely sensitive information. Receipts, identification documents, addresses, financial information, private notes, and other personal data should not need to be uploaded to a remote service simply to search them.

SnapSearch therefore prioritizes local processing and local storage.

---

## 🗺️ Future Improvements

Potential future improvements include:

* [ ] Improved OCR accuracy
* [ ] OCR progress tracking
* [ ] Duplicate image detection
* [ ] Advanced search filters
* [ ] Date-based filtering
* [ ] File-type filtering
* [ ] OCR language selection
* [ ] Search history
* [ ] Image tagging
* [ ] Folder-based organization
* [ ] Dark mode
* [ ] Progressive Web App support
* [ ] Better offline support
* [ ] Background image indexing
* [ ] Web Worker-based OCR processing
* [ ] Improved large-collection performance

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

If you have an idea that could make local image search faster, more private, or easier to use, feel free to open an issue or submit a pull request.

---

## 📄 License

This project is available under the license specified in the repository.

---

## 💡 Why SnapSearch?

SnapSearch isn't just another image gallery.

It transforms a collection of ordinary images into a **searchable personal knowledge archive**.

Instead of remembering *which photo* contains the information you need, you only need to remember **the text you're looking for**.

```text
Thousands of Images
        ↓
     Local OCR
        ↓
   Text Metadata
        ↓
   Instant Search
        ↓
   🎯 Find Your Image
```

**Search your memories by what they contain.**

**SnapSearch — Find the image. Remember the text. 🔎**
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
