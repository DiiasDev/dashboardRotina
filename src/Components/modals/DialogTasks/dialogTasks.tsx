import { useState } from "react";
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
  const [formData, setFormData] = useState({
    id: "",
    titulo: "",
    descricao: "",
    concluida: false,
    categoria: "",
  });

  const hadleChange = async () => {
    try {
        const newTask = new Tasks(
            Number(formData.id),
            formData.titulo,
            [formData.categoria],
            formData.descricao,
            formData.concluida
        );

        await newTask.init();

          setFormData({
            id: '',
            titulo: '',
            descricao: '',
            categoria: '',
            concluida: false
        });

    } catch (error) {
        console.warn("Erro ao capturar valores", error)
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
          <TextField 
            label="ID" 
            value={formData.id} 
            onChange={(e) => setFormData({...formData, id: e.target.value})} 
            fullWidth 
            aria-readonly
          />

          <FormControl fullWidth>
            <InputLabel>Categoria</InputLabel>
            <Select 
              value={formData.categoria} 
              label="Categoria" 
              onChange={(e) => setFormData({...formData, categoria: e.target.value})}
            >
              <MenuItem value="Casa">Casa</MenuItem>
              <MenuItem value="Trabalho">Trabalho</MenuItem>
              <MenuItem value="Faculdade">Faculdade</MenuItem>
            </Select>
          </FormControl>

        <TextField 
          label="Titulo da Task" 
          value={formData.titulo} 
          onChange={(e) => setFormData({...formData, titulo: e.target.value})} 
          fullWidth 
        />

        <TextField
          label="Descrição da Task"
          value={formData.descricao}
          onChange={(e) => setFormData({...formData, descricao: e.target.value})}
          multiline
          rows={3}
          fullWidth
        />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button autoFocus onClick={hadleChange} variant="contained">
          Salvar Task
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
