import Realm from 'realm';
import TodoModel from './TodoModel';

let repository = new Realm({
    schema: [{
	name: 'Todo',
	primaryKey: 'id',
	properties: {
	    id: {type: 'string', indexed: true},
      title: 'string',
      type: 'string',
      completed: 'bool',
	    createdAt: 'date',
	    updatedAt: 'date'
	}
    }],
    schemaVersion: 2
});

let TodoService = {
  findAll: function(sortBy) {
    if (!sortBy) sortBy = [['completed', false], ['updatedAt', true]];
    return repository.objects('Todo').sorted(sortBy);
  },

  save: function(todo) {
    if (repository.objects('Todo').filtered("title = '" + todo.title + "'").length) return;

    repository.write(() => {
      todo.updatedAt = new Date();
      repository.create('Todo', todo);
    })
  },

  update: function(todo, callback) {
    if (!callback) return;
    repository.write(() => {
      callback();
      todo.updatedAt = new Date();
    });
  }
};

console.log(repository.path);

TodoService.save(new TodoModel('Beauty Looks in the Mirror', 'Orange'));
TodoService.save(new TodoModel('Golden Dragon Circles the Heavens', 'Blue'));
TodoService.save(new TodoModel('Snapping Twig', 'Green'));
TodoService.save(new TodoModel('Dragon Thrusts Its Claws', 'Gold'));
TodoService.save(new TodoModel('Iron Fist of Pai Mei', 'Brown'));


module.exports = TodoService;