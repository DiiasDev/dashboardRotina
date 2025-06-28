import { useState } from "react";
import DatePicker from "react-datepicker";
import styles from "./styles.module.css";
import "react-datepicker/dist/react-datepicker.css";
import DialogTasks from "../modals/DialogTasks/dialogTasks";
import { TaskData } from "../../backend/api";

interface CabecalhoTasksProps {
  onFilterApply?: (filteredTasks: TaskData[]) => void;
  allTasks: TaskData[];
}

export default function CabecalhoTasks({ onFilterApply, allTasks }: CabecalhoTasksProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return "Selecionar";
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      setIsDatePickerOpen(false);
    }
  };

  const handleApplyFilter = () => {
    if (!startDate || !endDate) {
      onFilterApply?.(allTasks);
      return;
    }

    const normalizedStartDate = new Date(startDate);
    normalizedStartDate.setHours(0, 0, 0, 0);
    
    const normalizedEndDate = new Date(endDate);
    normalizedEndDate.setHours(23, 59, 59, 999);

    const filteredTasks = allTasks.filter((task) => {
      const taskDate = new Date(task.data_criacao);
      return taskDate >= normalizedStartDate && taskDate <= normalizedEndDate;
    });

    onFilterApply?.(filteredTasks);
  };

  const handleClearFilter = () => {
    setStartDate(null);
    setEndDate(null);
    onFilterApply?.(allTasks);
  };

  function openDialog() {
    setIsModalOpen(true);
  }

  const closeDialog = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.tasksTitle}>
        <h2>Minhas Tasks</h2>
        <button onClick={openDialog} className={styles.addButton}>+</button>
      </div>
      <div className={styles.filterWrapper}>
        <div className={styles.filtro}>
          <span className={styles.filtroLabel}>Filtro por data</span>
          <div
            className={styles.dateRange}
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
          >
            {formatDate(startDate)} - {formatDate(endDate)}
            <span className={styles.calendarIcon}>📅</span>
          </div>
          {isDatePickerOpen && (
            <div className={styles.datePickerWrapper}>
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                dateFormat="dd/MM/yy"
              />
            </div>
          )}
        </div>
        <button className={styles.applyButton} onClick={handleApplyFilter}>
          Aplicar
        </button>
        <button className={styles.applyButton} onClick={handleClearFilter}>
          Limpar
        </button>
      </div>
      <DialogTasks open={isModalOpen} onClose={closeDialog} />
    </>
  );
}
