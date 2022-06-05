# PDP for Serhii Saviuk | Backend

### [Weather scrapper](https://github.com/varekai-dev/pdp/tree/master/scrapper)

## PERSONAL BLOG API
Posts
```bash
@desc Get posts
@route GET /api/posts
@access Public

@desc Get single post
@route GET /api/post/:id
@access Public

@desc Create single post
@route POST /api/post/create
@access Private
@body title, content, thumbnail

@desc Update post
@route PUT /api/post/:id
@access Private
@body title, content, thumbnail

@desc Delete post
@route DELETE /api/post/:id
@access Private

```
Auth
```bash
@desc Register user
@route POST /api/auth/register
@access Public
@body email, password


@desc Login user
@route POST /api/auth/login
@access Public
@body email, password

```
Comments
```bash
@desc Get comments for single post
@route GET /api/posts/:id/comments
@access Public

@desc Post comment to post
@route POST /api/posts/:id/comments
@access Private
@body text

@desc Update comment
@route PUT /api/posts/:id/comments
@access Private
@body text

@desc Remove comment
@route DELETE /api/posts/:id/comments
@access Private

```
## DTO
User
```bash
email: string
password: string
isAdmin: boolean | default: false
avatar: string | default: ""
```
Post
```bash
title: string
thumbnail: string
content: string
likes: number | default: 0
```

Comment
```bash
text: string
```