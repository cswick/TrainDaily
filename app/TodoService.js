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
  findIncomplete: function(sortBy) {
    if (!sortBy) sortBy = [['completed', false], ['updatedAt', true]];
    let todos = repository.objects('Todo').filter(todo => !todo.completed);

    if (!todos) {
      todos.forEach(todo => {
        todo.completed = false;
        save(todo);
      });
      todos = repository.objects('Todo').filter(todo => !todo.completed);
    }

    let shuffled = (todos.sort(() => .5 - Math.random())).slice(0, 5);

    return shuffled;
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
TodoService.save(new TodoModel('Tiger From Shaolin', 'Orange'));
TodoService.save(new TodoModel('Dragon Returns to the Cave', 'Orange'));
TodoService.save(new TodoModel('Novice Discovers His Skills', 'Orange'));
TodoService.save(new TodoModel('Iron Monk Lashes Out', 'Orange'));
TodoService.save(new TodoModel('Plum Flover', 'Orange'));

TodoService.save(new TodoModel('Black Tiger Enters the Cave', 'Blue'));
TodoService.save(new TodoModel('Tiger Crosses the Iron Bridge', 'Blue'));
TodoService.save(new TodoModel('Golden Dragon Circles the Heavens', 'Blue'));
TodoService.save(new TodoModel('Slicing Dragon', 'Blue'));
TodoService.save(new TodoModel('Drawbridge (A)', 'Blue'));
TodoService.save(new TodoModel('Drawbridge (B)', 'Blue'));
TodoService.save(new TodoModel('Crosing the Sun (A)', 'Blue'));
TodoService.save(new TodoModel('Crossing the Sun (B)', 'Blue'));
TodoService.save(new TodoModel('Crouching Falcon', 'Blue'));
TodoService.save(new TodoModel('Continuous Butterfly Palms', 'Blue'));
TodoService.save(new TodoModel('Eagle Pin', 'Blue'));
TodoService.save(new TodoModel('Crane Leap', 'Blue'));
TodoService.save(new TodoModel('Arm Hook', 'Blue'));
TodoService.save(new TodoModel('Divided Swords', 'Blue'));
TodoService.save(new TodoModel('Windmill Guard', 'Blue'));
TodoService.save(new TodoModel('Opening the Fan', 'Blue'));
TodoService.save(new TodoModel('Lau Gar', 'Blue'));

TodoService.save(new TodoModel('Darkness', 'Green'));
TodoService.save(new TodoModel('Sweeping Arm Hook', 'Green'));
TodoService.save(new TodoModel('Spinning from the Sun', 'Green'));
TodoService.save(new TodoModel('Flashing Wings', 'Green'));
TodoService.save(new TodoModel('Snapping Twig', 'Green'));
TodoService.save(new TodoModel('Prayer of Death', 'Green'));
TodoService.save(new TodoModel('Striking Serpent', 'Green'));
TodoService.save(new TodoModel('Arcing Blades', 'Green'));
TodoService.save(new TodoModel('Attacking the Wall', 'Green'));
TodoService.save(new TodoModel('Circle of China', 'Green'));
TodoService.save(new TodoModel('Blocking the Sun', 'Green'));
TodoService.save(new TodoModel('Dance of Death', 'Green'));
TodoService.save(new TodoModel('Returning Viper', 'Green'));
TodoService.save(new TodoModel('Returnig Thunder', 'Green'));
TodoService.save(new TodoModel('The Serpent', 'Green'));
TodoService.save(new TodoModel('Broken Staff', 'Green'));
TodoService.save(new TodoModel('Circling Serpent', 'Green'));
TodoService.save(new TodoModel('Sticks of Satin', 'Green'));
TodoService.save(new TodoModel('Ching Neen Kuen', 'Green'));


TodoService.save(new TodoModel('Thundering Hammers', 'Gold'));
TodoService.save(new TodoModel('Dragon Thrusts Its Claws', 'Gold'));
TodoService.save(new TodoModel('Leap of Death', 'Gold'));
TodoService.save(new TodoModel('Two Headed Serpent', 'Gold'));
TodoService.save(new TodoModel('Three Winds Claw', 'Gold'));
TodoService.save(new TodoModel('Boxer\u2019s Fury', 'Gold'));
TodoService.save(new TodoModel('The Phoenix', 'Gold'));
TodoService.save(new TodoModel('Swinging Gate', 'Gold'));
TodoService.save(new TodoModel('Hidden Fist', 'Gold'));
TodoService.save(new TodoModel('Plucking a Bird from the Sky', 'Gold'));
TodoService.save(new TodoModel('Circles of Glass', 'Gold'));
TodoService.save(new TodoModel('Flashig Daggers', 'Gold'));
TodoService.save(new TodoModel('One With Nature', 'Gold'));
TodoService.save(new TodoModel('Rage of the White Crane', 'Gold'));
TodoService.save(new TodoModel('Flame of the Mountain Dragon', 'Gold'));
TodoService.save(new TodoModel('Springing Tiger', 'Gold'));
TodoService.save(new TodoModel('Leopard at the Well (A)', 'Gold'));
TodoService.save(new TodoModel('Leopard at the Well (B)', 'Gold'));
TodoService.save(new TodoModel('Fang of Silk', 'Gold'));
TodoService.save(new TodoModel('Gung Gee Fook Fu', 'Gold'));

TodoService.save(new TodoModel('Circles of Destructio', 'Brown'));
TodoService.save(new TodoModel('Wind Enters the Cave', 'Brown'));
TodoService.save(new TodoModel('Thief Steals the Jewels', 'Brown'));
TodoService.save(new TodoModel('Mystic\u2019s Fury', 'Brown'));
TodoService.save(new TodoModel('Tiger in the Mist', 'Brown'));
TodoService.save(new TodoModel('Challenge the Renegade', 'Brown'));
TodoService.save(new TodoModel('Broken Arrow', 'Brown'));
TodoService.save(new TodoModel('Iron Fist of Pai Mei', 'Brown'));
TodoService.save(new TodoModel('Heaven and Earth', 'Brown'));
TodoService.save(new TodoModel('Hu Chuan of Pai Mei', 'Brown'));

TodoService.save(new TodoModel('Five Animals/Five Elements', 'Red'));

TodoService.save(new TodoModel('Tiger Crane(Fu Hok)', 'Black'));


module.exports = TodoService;