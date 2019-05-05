import Utils from './Utils';

class TodoModel {
  constructor(title, level, type, completed) {
    this.id = Utils.guid();
    this.title = title;
    this.completed = completed || false;
    this.level = level;
    this.type = type;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = TodoModel;