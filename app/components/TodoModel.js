import Utils from './Utils';

class TodoModel {
  constructor(title, type, completed) {
    this.id = Utils.guid();
    this.title = title;
    this.completed = completed || false;
    this.type = type;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = TodoModel;