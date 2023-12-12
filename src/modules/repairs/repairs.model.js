import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';


const Repair = sequelize.define('repairs', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    motorsNumber: {
      type: DataTypes.STRING,
      allowNull:true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
    ,
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
      defaultValue: 'pending',
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: false
    }
});

export default Repair;  