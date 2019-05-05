//import Realm from 'realm';
import TodoModel from './TodoModel';

/*let repository = new Realm({
    schema: [{
	name: 'Todo',
	primaryKey: 'id',
	properties: {
	    id: {type: 'string', indexed: true},
      title: 'string',
      type: 'string',
      level: 'string',
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
  },

  filterRecords: function (filter) {
    let todos = repository.objects('Todo').filter(todo => !todo.completed && todo.type === filter);

    let shuffled = (todos.sort(() => .5 - Math.random())).slice(0, 5);

    return shuffled;
  }

};

console.log(repository.path);

TodoService.save(new TodoModel('Beauty Looks in the Mirror', 'Orange', 'Technique'));
TodoService.save(new TodoModel('Tiger From Shaolin', 'Orange', 'Technique'));
TodoService.save(new TodoModel('Dragon Returns to the Cave', 'Orange', 'Technique'));
TodoService.save(new TodoModel('Novice Discovers His Skills', 'Orange', 'Technique'));
TodoService.save(new TodoModel('Iron Monk Lashes Out', 'Orange', 'Technique'));
TodoService.save(new TodoModel('Plum Flover', 'Orange', 'Form'));

TodoService.save(new TodoModel('Black Tiger Enters the Cave', 'Blue', 'Technique'));
TodoService.save(new TodoModel('Tiger Crosses the Iron Bridge', 'Blue', 'Technique'));
TodoService.save(new TodoModel('Golden Dragon Circles the Heavens', 'Blue', 'Technique'));
TodoService.save(new TodoModel('Slicing Dragon', 'Blue', 'Technique'));
TodoService.save(new TodoModel('Drawbridge (A)', 'Blue', 'Technique'));
TodoService.save(new TodoModel('Drawbridge (B)', 'Blue', 'Technique'));
TodoService.save(new TodoModel('Crosing the Sun (A)', 'Blue', 'Technique'));
TodoService.save(new TodoModel('Crossing the Sun (B)', 'Blue', 'Technique'));
TodoService.save(new TodoModel('Crouching Falcon', 'Blue', 'Technique'));
TodoService.save(new TodoModel('Continuous Butterfly Palms', 'Blue', 'Technique'));
TodoService.save(new TodoModel('Eagle Pin', 'Blue', 'Technique'));
TodoService.save(new TodoModel('Crane Leap', 'Blue', 'Technique'));
TodoService.save(new TodoModel('Arm Hook', 'Blue', 'Technique'));
TodoService.save(new TodoModel('Divided Swords', 'Blue', 'Technique'));
TodoService.save(new TodoModel('Windmill Guard', 'Blue', 'Technique'));
TodoService.save(new TodoModel('Opening the Fan', 'Blue', 'Technique'));
TodoService.save(new TodoModel('Lau Gar', 'Blue', 'Form'));

TodoService.save(new TodoModel('Darkness', 'Green', 'Technique'));
TodoService.save(new TodoModel('Sweeping Arm Hook', 'Green', 'Technique'));
TodoService.save(new TodoModel('Spinning from the Sun', 'Green', 'Technique'));
TodoService.save(new TodoModel('Flashing Wings', 'Green', 'Technique'));
TodoService.save(new TodoModel('Snapping Twig', 'Green', 'Technique'));
TodoService.save(new TodoModel('Prayer of Death', 'Green', 'Technique'));
TodoService.save(new TodoModel('Striking Serpent', 'Green', 'Technique'));
TodoService.save(new TodoModel('Arcing Blades', 'Green', 'Technique'));
TodoService.save(new TodoModel('Attacking the Wall', 'Green', 'Technique'));
TodoService.save(new TodoModel('Circle of China', 'Green', 'Technique'));
TodoService.save(new TodoModel('Blocking the Sun', 'Green', 'Technique'));
TodoService.save(new TodoModel('Dance of Death', 'Green', 'Technique'));
TodoService.save(new TodoModel('Returning Viper', 'Green', 'Technique'));
TodoService.save(new TodoModel('Returnig Thunder', 'Green', 'Technique'));
TodoService.save(new TodoModel('The Serpent', 'Green', 'Technique'));
TodoService.save(new TodoModel('Broken Staff', 'Green', 'Technique'));
TodoService.save(new TodoModel('Circling Serpent', 'Green', 'Technique'));
TodoService.save(new TodoModel('Sticks of Satin', 'Green', 'Technique'));
TodoService.save(new TodoModel('Ching Neen Kuen', 'Green', 'Form'));


TodoService.save(new TodoModel('Thundering Hammers', 'Gold', 'Technique'));
TodoService.save(new TodoModel('Dragon Thrusts Its Claws', 'Gold', 'Technique'));
TodoService.save(new TodoModel('Leap of Death', 'Gold', 'Technique'));
TodoService.save(new TodoModel('Two Headed Serpent', 'Gold', 'Technique'));
TodoService.save(new TodoModel('Three Winds Claw', 'Gold', 'Technique'));
TodoService.save(new TodoModel('Boxer\u2019s Fury', 'Gold', 'Technique'));
TodoService.save(new TodoModel('The Phoenix', 'Gold', 'Technique'));
TodoService.save(new TodoModel('Swinging Gate', 'Gold', 'Technique'));
TodoService.save(new TodoModel('Hidden Fist', 'Gold', 'Technique'));
TodoService.save(new TodoModel('Plucking a Bird from the Sky', 'Gold', 'Technique'));
TodoService.save(new TodoModel('Circles of Glass', 'Gold', 'Technique'));
TodoService.save(new TodoModel('Flashing Daggers', 'Gold', 'Technique'));
TodoService.save(new TodoModel('One With Nature', 'Gold', 'Technique'));
TodoService.save(new TodoModel('Rage of the White Crane', 'Gold', 'Technique'));
TodoService.save(new TodoModel('Flame of the Mountain Dragon', 'Gold', 'Technique'));
TodoService.save(new TodoModel('Springing Tiger', 'Gold', 'Technique'));
TodoService.save(new TodoModel('Leopard at the Well (A)', 'Gold', 'Technique'));
TodoService.save(new TodoModel('Leopard at the Well (B)', 'Gold'), 'Technique');
TodoService.save(new TodoModel('Fang of Silk', 'Gold', 'Technique'));
TodoService.save(new TodoModel('Gung Gee Fook Fu', 'Gold'), 'Form');

TodoService.save(new TodoModel('Circles of Destruction', 'Brown', 'Technique'));
TodoService.save(new TodoModel('Wind Enters the Cave', 'Brown', 'Technique'));
TodoService.save(new TodoModel('Thief Steals the Jewels', 'Brown', 'Technique'));
TodoService.save(new TodoModel('Mystic\u2019s Fury', 'Brown', 'Technique'));
TodoService.save(new TodoModel('Tiger in the Mist', 'Brown', 'Technique'));
TodoService.save(new TodoModel('Challenge the Renegade', 'Brown', 'Technique'));
TodoService.save(new TodoModel('Broken Arrow', 'Brown', 'Technique'));
TodoService.save(new TodoModel('Iron Fist of Pai Mei', 'Brown', 'Technique'));
TodoService.save(new TodoModel('Heaven and Earth', 'Brown', 'Technique'));
TodoService.save(new TodoModel('Hu Chuan of Pai Mei', 'Brown', 'Form'));

TodoService.save(new TodoModel('Five Animals/Five Elements', 'Red', 'Form'));

TodoService.save(new TodoModel('Tiger Crane(Fu Hok)', 'Black', 'Form'));

TodoService.save(new TodoModel('Hammer and Anvil', 'All', 'Empty Hand Drill'));
TodoService.save(new TodoModel('Palm Set', 'All', 'Empty Hand Drill'));
TodoService.save(new TodoModel('One Hand Blocks Two', 'All', 'Empty Hand Drill'));
TodoService.save(new TodoModel('Tiger Chamber 10 Count', 'All', 'Empty Hand Drill'));
TodoService.save(new TodoModel('Dragon Walks the Body', 'All', 'Empty Hand Drill'));
TodoService.save(new TodoModel('Guarding the Temple Gate', 'All', 'Empty Hand Drill'));
TodoService.save(new TodoModel('Lop Sau Drill (1, 2)', 'All', 'Empty Hand Drill'));
TodoService.save(new TodoModel('Gung Gee 10 Count', 'All', 'Empty Hand Drill'));
TodoService.save(new TodoModel('Two Tigers (A, B)', 'All', 'Empty Hand Drill'));
TodoService.save(new TodoModel('Joint Lock Flow (1, 2, 3)', 'All', 'Empty Hand Drill'));
TodoService.save(new TodoModel('5 Step Butterfly Moves', 'All', 'Empty Hand Drill'));
TodoService.save(new TodoModel('12 Count Flow', 'All', 'Empty Hand Drill'));
TodoService.save(new TodoModel('Golden Tiger 6 Count', 'All', 'Empty Hand Drill'));
TodoService.save(new TodoModel('Seal the Eyes', 'All', 'Empty Hand Drill'));
TodoService.save(new TodoModel('Monk Airs Out the Corpse', 'All', 'Empty Hand Drill'));
TodoService.save(new TodoModel('Gee San\u2019s Palms', 'All', 'Empty Hand Drill'));
TodoService.save(new TodoModel('Fairbairn (Chin Jab, 4 Count, Closing Distance)', 'All', 'Empty Hand Drill'));
TodoService.save(new TodoModel('Fairbairn (12 Targets - Open Hand Strikes, Defense Against Thrust)', 'All', 'Empty Hand Drill'));

TodoService.save(new TodoModel('Windy Airs', 'All', 'Staff'));
TodoService.save(new TodoModel('Two Monks Staff (A, B)', 'All', 'Staff'));
TodoService.save(new TodoModel('Combined Masters', 'All', 'Staff'));
TodoService.save(new TodoModel('Third Brother', 'All', 'Staff'));
TodoService.save(new TodoModel('Hoi Tong', 'All', 'Staff'));
TodoService.save(new TodoModel('7 Count', 'All', 'Staff'));
TodoService.save(new TodoModel('8 Count', 'All', 'Staff'));
TodoService.save(new TodoModel('Staff Technique (1, 2)', 'All', 'Staff'));
TodoService.save(new TodoModel('Twin Dragon Staff Set', 'All', 'Staff'));
TodoService.save(new TodoModel('Technique (Monkey, Against L Punch)', 'All', 'Staff'));
TodoService.save(new TodoModel('Technique (Monk Knocks at the Gate, Monk Raises Dust)', 'All', 'Staff'));
TodoService.save(new TodoModel('Technique (King Waves the Fan', 'All', 'Staff'));

TodoService.save(new TodoModel('Live Blade Set', 'All', 'Blade'));
TodoService.save(new TodoModel('Wu Mei', 'All', 'Blade'));
TodoService.save(new TodoModel('12 Count Stripping Drill', 'All', 'Blade'));
TodoService.save(new TodoModel('Classical Angles (1-12)', 'All', 'Blade'));
TodoService.save(new TodoModel('9 Vital Cuts (Left, Right)', 'All', 'Blade'));
TodoService.save(new TodoModel('10 Count Blade Template and Counters (Close, Mid, Long Range)', 'All', 'Blade'));
TodoService.save(new TodoModel('6 Count Finisher from The Hunted', 'All', 'Blade'));
TodoService.save(new TodoModel('12 Count Knife Against High 5 Line', 'All', 'Blade'));
TodoService.save(new TodoModel('13 Count Attack', 'All', 'Blade'));
TodoService.save(new TodoModel('Shadow Warrior - "Terminator"', 'All', 'Blade'));
TodoService.save(new TodoModel('Blade vs. Empty Hand - Overhead Stab to Chest Defense(inside and outside)', 'All', 'Blade'));
TodoService.save(new TodoModel('Go Around the Corner', 'All', 'Blade'));

TodoService.save(new TodoModel('12 Count Flow', 'All', 'Karambit'));
TodoService.save(new TodoModel('Flow Drill (1, 2)', 'All', 'Karambit'));
TodoService.save(new TodoModel('Advanced Tech (1, 2)', 'All', 'Karambit'));
TodoService.save(new TodoModel('Muscles and Vein Targets', 'All', 'Karambit'));
TodoService.save(new TodoModel('DOA Karambit Set', 'All', 'Karambit'));


TodoService.save(new TodoModel('Avenging Serpents', 'All', 'Double Blade'));
TodoService.save(new TodoModel('Technique (1, 2, 3)', 'All', 'Double Blade'));

TodoService.save(new TodoModel('Basic Opening', 'All', 'Bowie Knife'));
TodoService.save(new TodoModel('7 Count Defensive', 'All', 'Bowie Knife'));
TodoService.save(new TodoModel('Technique (1-4', 'All', 'Bowie Knife'));
TodoService.save(new TodoModel('Backcut', 'All', 'Bowie Knife'));

TodoService.save(new TodoModel('Butterfly Swords', 'All', 'Form'));
TodoService.save(new TodoModel('Double Edge Straight Sword', 'Black', 'Form'));

TodoService.save(new TodoModel('Strikes Closed (1-8)', 'Black', 'Iron Fan'));
TodoService.save(new TodoModel('Blocks Closed (1-4)', 'Black', 'Iron Fan'));
TodoService.save(new TodoModel('Blocks & Strikes - Fan Opened (1-4)', 'Black', 'Iron Fan'));
TodoService.save(new TodoModel('Cover Blocks (1-3)', 'Black', 'Iron Fan'));
TodoService.save(new TodoModel('Iron Fan Form', 'Black', 'Iron Fan'));


TodoService.save(new TodoModel('Tiger Chi Kung', 'All', 'Breathing/Chi Kung'));
TodoService.save(new TodoModel('Arrow Hand', 'All', 'Breathing/Chi Kung'));
TodoService.save(new TodoModel('Tom Toi Set', 'All', 'Breathing/Chi Kung'));
TodoService.save(new TodoModel('Tibetan Lama Horse', 'All', 'Breathing/Chi Kung'));
TodoService.save(new TodoModel('Embrace Tiger, Return to Mountain', 'All', 'Breathing/Chi Kung'));
TodoService.save(new TodoModel('Dragon Breathing', 'All', 'Breathing/Chi Kung'));
TodoService.save(new TodoModel('Close Door', 'All', 'Breathing/Chi Kung'));
TodoService.save(new TodoModel('Iron Buddha', 'All', 'Breathing/Chi Kung'));
TodoService.save(new TodoModel('Body Tapping', 'All', 'Breathing/Chi Kung'));

TodoService.save(new TodoModel('Floating Short Stick', 'All', 'Stick'));
TodoService.save(new TodoModel('Fairbairn 5 Count', 'All', 'Stick'));
TodoService.save(new TodoModel('Steyer\u2019s 6 Count', 'All', 'Stick'));

TodoService.save(new TodoModel('Tigertail Knife/Sword', 'All', 'Broadsword'));
TodoService.save(new TodoModel('Technique (1, 2, 3, 4)', 'All', 'Broadsword'));
TodoService.save(new TodoModel('Movements', 'All', 'Broadsword'));
TodoService.save(new TodoModel('Thrusts (Vertical, Reverse, Inverted, Palm Up)', 'All', 'Broadsword'));

TodoService.save(new TodoModel('Disarms (Front, Back, Forehead, On Knees)', 'All', 'Gun'));

TodoService.save(new TodoModel('Passing the Horizon', 'All', 'Technique'));
TodoService.save(new TodoModel('Rising Claw', 'All', 'Technique'));
TodoService.save(new TodoModel('Sumo', 'All', 'Technique'));
TodoService.save(new TodoModel('Kimomo Grab', 'All', 'Technique'));
TodoService.save(new TodoModel('Crash of the Eagles (A, B, C, D, E)', 'All', 'Technique'));
TodoService.save(new TodoModel('Spiraling Wrist (A, B)', 'All', 'Technique'));
TodoService.save(new TodoModel('Hands of Jade (A, B)', 'All', 'Technique'));
TodoService.save(new TodoModel('Tackle Technique (A, B, C)', 'All', 'Technique'));
TodoService.save(new TodoModel('Dancer(A, B)', 'All', 'Technique'));
TodoService.save(new TodoModel('Lever (A, B, C)', 'All', 'Technique'));
TodoService.save(new TodoModel('Eagle Claw', 'All', 'Technique'));
TodoService.save(new TodoModel('Flowing Hands', 'All', 'Technique'));
TodoService.save(new TodoModel('Crossing Talon (A, B, C, D)', 'All', 'Technique'));
TodoService.save(new TodoModel('Swinging Warrior', 'All', 'Technique'));
TodoService.save(new TodoModel('Cyclone', 'All', 'Technique'));
TodoService.save(new TodoModel('Catching the Wind', 'All', 'Technique'));
TodoService.save(new TodoModel('Eagle\u2019s Beak (A, B, C)', 'All', 'Technique'));

TodoService.save(new TodoModel('7 Target Points for Striking with Tip/Crook', 'All', 'Cane'));
TodoService.save(new TodoModel('7 Target Points for Stabbing with Tip', 'All', 'Cane'));
TodoService.save(new TodoModel('6 Target Points for the Hook', 'All', 'Cane'));
TodoService.save(new TodoModel('Grab Defense (Throat Rip, Bent Spring Leg)', 'All', 'Cane'));
TodoService.save(new TodoModel('Fairbairn 5 Count', 'All', 'Cane'));
TodoService.save(new TodoModel('Steyer\u2019s 6 Count', 'All', 'Cane'));
TodoService.save(new TodoModel('Pin, Block, Drag, Ram', 'All', 'Cane'));
TodoService.save(new TodoModel('Hammerlock Control of Left Arm', 'All', 'Cane'));
TodoService.save(new TodoModel('Right Cross Close Range - Thigh Launch', 'All', 'Cane'));
TodoService.save(new TodoModel('Right Cross Mid Range - Fracture Forearm & Shin, 4 Target Follow Up', 'All', 'Cane'));
TodoService.save(new TodoModel('Figure 4 - Arm Bends, Arm Doesn\u2019t Bend', 'All', 'Cane'));
TodoService.save(new TodoModel('Right Push/Grab, Left Kick - Neck Lock', 'All', 'Cane'));

module.exports = TodoService;
*/