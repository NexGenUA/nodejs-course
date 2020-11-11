const mongoose = require('mongoose');
const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title, order } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static create(column) {
    return new Column(column);
  }
}

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: {
      type: Array,
      set: columns => columns.map(Column.create)
    },
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = ({ id, columns, title }) => ({
  id,
  columns,
  title
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
