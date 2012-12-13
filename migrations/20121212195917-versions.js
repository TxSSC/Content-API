module.exports = {
  up: function(migration, DataTypes) {
    migration.createTable('Versions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      topic_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    migration.addIndex('Versions', ['topic_id']);
  },
  down: function(migration) {
    migration.dropTable('Versions');
  }
};