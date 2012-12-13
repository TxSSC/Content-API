module.exports = {
  up: function(migration, DataTypes) {
    migration.createTable('CommitsVersions', {
      version_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      commit_id: {
        type: DataTypes.INTEGER,
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
    migration.addIndex('CommitsVersions', ['commit_id', 'version_id']);
  },
  down: function(migration) {
    migration.dropTable('CommitsVersions');
  }
};