module.exports = {
  up: function(migration, DataTypes) {
    migration.createTable('topics', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      permalink: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      engine: 'MYISAM', // default: 'InnoDB'
      charset: 'latin1' // default: null
    });
  },
  down: function(migration) {
    migration.dropTable('topics');
  }
};