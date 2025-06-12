import { useState } from "react";
import DatePicker from "react-datepicker";
import styles from "./styles.module.css";
import "react-datepicker/dist/react-datepicker.css";
import DialogTasks from "../modals/DialogTasks/dialogTasks";
import { Call } from "@mui/icons-material";

export default function CabecalhoTasks() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
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
    // Implement your filter logic here
    console.log("Applying filter:", { startDate, endDate });
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
      </div>
      <DialogTasks open={isModalOpen} onClose={closeDialog} />
    </>
  );
}
