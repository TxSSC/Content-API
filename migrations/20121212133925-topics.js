module.exports = {
  up: function(migration, DataTypes) {
    migration.createTable('Topics', {
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
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      engine: 'MYISAM', // default: 'InnoDB'
      charset: 'latin1' // default: null
    });
  },
  down: function(migration) {
    migration.dropTable('Topics');
  }
};