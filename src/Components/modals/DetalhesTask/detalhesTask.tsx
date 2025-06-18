import { Card, Container } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import styles from './styles.module.css'

interface TaskData {
  id: number;
  titulo: string;
  categoria: string[];
  descricao: string;
  concluido: boolean;
  dataCreacao: string;
}

interface DetalhesTaskProps {
  open: boolean;
  onClose: () => void;
  taskData: TaskData | null;
}

export default function DetalhesTask({ open, onClose, taskData }: DetalhesTaskProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={styles.modalOverlay}
      PaperProps={{
        className: styles.modalContent,
        onClick: (e: React.MouseEvent) => e.stopPropagation()
      }}
      BackdropProps={{
        onClick: onClose
      }}
    >
      <Container maxWidth="md" disableGutters>
        <Card className={styles.cardContent}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Detalhes da Task</h3>
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>
          </div>
          
          <div className={styles.modalBody}>
            {taskData && (
              <>
                <h4 className={styles.taskTitle}>{taskData.titulo}</h4>
                
                <div className={styles.contentGrid}>
                  <div className={styles.fullWidth}>
                    <div className={styles.taskSection}>
                      <span className={styles.sectionLabel}>Descrição</span>
                      <div className={styles.sectionContent}>{taskData.descricao}</div>
                    </div>
                  </div>
                  
                  <div className={styles.halfWidth}>
                    <div className={styles.taskSection}>
                      <span className={styles.sectionLabel}>Categoria</span>
                      <div className={styles.categoryList}>
                        {taskData.categoria.map((cat, index) => (
                          <span key={index} className={styles.categoryTag}>{cat}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.halfWidth}>
                    <div className={styles.taskSection}>
                      <span className={styles.sectionLabel}>Status</span>
                      <div className={`${styles.statusBadge} ${taskData.concluido ? styles.concluido : styles.pendente}`}>
                        <span className={styles.statusIcon}></span>
                        {taskData.concluido ? 'Concluída' : 'Pendente'}
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.fullWidth}>
                    <div className={styles.taskSection}>
                      <span className={styles.sectionLabel}>Data de Criação</span>
                      <div className={styles.sectionContent}>{formatDate(taskData.dataCreacao)}</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>
      </Container>
    </Dialog>
  );
}
