import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import { Tasks } from "../../../logic/tasks";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface DialogTasksProps {
  open: boolean;
  onClose: () => void;
}

export default function DialogTasks({ open, onClose }: DialogTasksProps) {
  const [taskId, setTaskId] = useState<number>(0);
  const [formData, setFormData] = useState({
    id: "",
    titulo: "",
    descricao: "",
    concluida: false,
    categoria: "",
  });

  // Gerar novo ID quando dialog abrir
  useEffect(() => {
    if (open) {
      const novoId = Math.floor(Math.random() * 90000000) + 10000000;
      setTaskId(novoId);
      setFormData((prev) => ({ ...prev, id: novoId.toString() }));
    }
  }, [open]);

  const handleChange = async () => {
    try {
      // Validações básicas
      if (!formData.titulo.trim()) {
        alert("Título é obrigatório!");
        return;
      }
      if (!formData.categoria) {
        alert("Categoria é obrigatória!");
        return;
      }

      const newTask = new Tasks(
        taskId,
        formData.titulo,
        [formData.categoria],
        formData.descricao,
        formData.concluida
      );

      newTask.createTasks();

      // Limpar formulário
      const novoId = Math.floor(Math.random() * 90000000) + 10000000;
      setTaskId(novoId);
      setFormData({
        id: novoId.toString(),
        titulo: "",
        descricao: "",
        categoria: "",
        concluida: false,
      });

      onClose();
    } catch (error) {
      console.warn("Erro ao criar task:", error);
    }
  };

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Nova Task
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* Campo ID Read-only */}
          <TextField
            label="ID (Gerado automaticamente)"
            value={formData.id}
            fullWidth
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            sx={{
              "& .MuiInputBase-input": {
                backgroundColor: "#f5f5f5",
                cursor: "not-allowed",
                color: "#666",
              },
            }}
          />

          <FormControl fullWidth>
            <InputLabel>Categoria</InputLabel>
            <Select
              value={formData.categoria}
              label="Categoria"
              onChange={(e) =>
                setFormData({ ...formData, categoria: e.target.value })
              }
            >
              <MenuItem value="Casa">Casa</MenuItem>
              <MenuItem value="Trabalho">Trabalho</MenuItem>
              <MenuItem value="Faculdade">Faculdade</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Título da Task"
            value={formData.titulo}
            onChange={(e) =>
              setFormData({ ...formData, titulo: e.target.value })
            }
            fullWidth
            required
          />

          <TextField
            label="Descrição da Task"
            value={formData.descricao}
            onChange={(e) =>
              setFormData({ ...formData, descricao: e.target.value })
            }
            multiline
            rows={3}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button autoFocus onClick={handleChange} variant="contained">
          Salvar Task
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
