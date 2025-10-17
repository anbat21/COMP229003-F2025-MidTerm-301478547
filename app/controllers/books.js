let BookModel = require('../models/books');

// GET /api/books/:id   (template GET dùng :id)
// Chấp nhận cả :id và :bookId để an toàn tham số
module.exports.getBook = async function (req, res, next) {
  try {
    const id = req.params.id || req.params.bookId;
    const book = await BookModel.findOne({ _id: id });

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    return res.json(book);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// POST /api/books
module.exports.create = async function (req, res, next) {
  try {
    const book = req.body;
    const result = await BookModel.create(book);
    console.log('Result: ', result);

    return res.status(201).json({
      success: true,
      message: 'Book created successfully.',
      bookId: result._id
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// GET /api/books
module.exports.getAll = async function (req, res, next) {
  try {
    const list = await BookModel.find();
    return res.json(list);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// PUT /api/books/:bookId   (template PUT dùng :bookId)
module.exports.update = async function (req, res, next) {
  try {
    // Build update doc từ body + id từ params
    const id = req.params.bookId || req.params.id;
    let updatedBook = BookModel(req.body);
    updatedBook._id = id;

    const result = await BookModel.updateOne({ _id: id }, updatedBook);
    console.log('Result: ', result);

    if (result.modifiedCount > 0) {
      return res.status(200).json({ success: true, message: 'Book updated successfully.' });
    } else {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// DELETE /api/books/:bookId   (template DELETE dùng :bookId)
// Chấp nhận cả :bookId và :id; trả 404 nếu không có
module.exports.remove = async function (req, res, next) {
  try {
    const id = req.params.bookId || req.params.id;
    console.log('DELETE id =', id, 'params =', req.params);

    const deleted = await BookModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    return res.json({ success: true, message: 'Book deleted successfully.' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
