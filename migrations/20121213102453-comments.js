module.exports = {
  up: function(migration, DataTypes) {
    migration.createTable('Comments', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      version_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      content: {
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
    migration.addIndex('Comments', ['item_id']);
    migration.addIndex('Comments', ['version_id']);
    migration.addIndex('Comments', ['user_id']);
  },
  down: function(migration) {
    migration.dropTable('Comments');
  }
};