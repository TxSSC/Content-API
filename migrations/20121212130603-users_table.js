module.exports = {
  up: function(migration, DataTypes) {
    migration.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      engine: 'MYISAM', // default: 'InnoDB'
      charset: 'latin1' // default: null
    });
  },
  down: function(migration) {
    migration.dropTable('users');
  }
};