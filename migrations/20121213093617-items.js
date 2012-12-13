module.exports = {
  up: function(migration, DataTypes) {
    migration.createTable('items', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      topic_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
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

    // Foreign Key Index
    migration.addIndex('items', ['topic_id']);
  },
  down: function(migration) {
    migration.dropTable('items');
  }
};