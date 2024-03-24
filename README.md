# Quotes API
© 2024, Raihan Khairul Rochman  

A lightweight and free quotes API.  
This API is hosted at [this address](https://free-quotes.vercel.app).
Feel free to visit it.

# Credit
**All of the quotes data used in this API is downloaded from [this source](https://huggingface.co/datasets/Abirate/english_quotes).**

# API Docs
* `/api/authors`
  ---
  Show all of the author of the quotes.  
  **Example request:**
  ```
  https://free-quotes.vercel.app/api/authors
  ```
  **Example response:**
  ```json
  {
    "code": 200,
    "status": "OK",
    "data": [
      "Oscar Wilde",
      "Marilyn Monroe",
      "Albert Einstein",
      "Frank Zappa",
      ...
    ]
  }
  ```
  [Back to top](#api-docs)

* `/api/tags`
  ---
  Show all of the available tags from all quotes.  
  **Example request**
  ```
  https://free-quotes.vercel.app/api/tags
  ```
  **Example response:**
  ```json
  {
    "code": 200,
    "status": "OK",
    "data": [
      "be-yourself",
      "gilbert-perreira",
      "honesty",
      "inspirational",
      ...
    ]
  }
  ```
  [Back to top](#api-docs)

* `/api/tags/popularity`
  ---
  Show all the tags with the count of its appearance among the quotes datasets. Sorted from the most-appearance to the least-appearance.
