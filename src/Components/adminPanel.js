import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AdminPanel = ({ sections, updateSections }) => {
  const [expanded, setExpanded] = useState(true);
  const [adminCollapsed, setAdminCollapsed] = useState(false);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);
  const [selectedRecordIndex, setSelectedRecordIndex] = useState(null);
  const [editingRecordData, setEditingRecordData] = useState(null);
  const [editingSectionHeader, setEditingSectionHeader] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isAdminVisible, setIsAdminVisible] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdminVisible") === "true";
    setIsAdminVisible(adminStatus);
  }, []);
  
  useEffect(() => {
    localStorage.setItem("isAdminVisible", isAdminVisible.toString());
  }, [isAdminVisible]); // Добавленный useEffect
  
  

  const handleSectionChange = (event) => {
    const selectedIndex = event.target.value === "" ? null : event.target.value;
    setSelectedSectionIndex(selectedIndex);
    setSelectedRecordIndex(null);
    setEditingRecordData(null);
    if (selectedIndex !== null && sections[selectedIndex]) {
      setEditingSectionHeader(sections[selectedIndex].header);
    } else {
      setEditingSectionHeader("");
    }
  };

  const handleRecordChange = (event) => {
    const recordIndex = event.target.value;
    setSelectedRecordIndex(recordIndex);
  
    if (
      sections &&
      sections[selectedSectionIndex] &&
      Array.isArray(sections[selectedSectionIndex].files)
    ) {
      const selectedRecord = sections[selectedSectionIndex].files[recordIndex];
      setEditingRecordData({ ...selectedRecord });
    } else {
      setEditingRecordData(null);
    }
  };
  

  const handleRecordEditingChange = (field, value) => {
    setEditingRecordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSectionHeaderChange = (event) => {
    setEditingSectionHeader(event.target.value);
  };

  const saveEditedRecord = () => {
    const updatedSections = [...sections];
    updatedSections[selectedSectionIndex].files[selectedRecordIndex] = editingRecordData;
    updateSections(updatedSections);
  };

  const saveEditedSection = () => {
    const updatedSections = [...sections];
    updatedSections[selectedSectionIndex].header = editingSectionHeader;
    updateSections(updatedSections);
  };

  const confirmDeleteRecord = () => {
    const updatedSections = [...sections];
    updatedSections[selectedSectionIndex].files.splice(selectedRecordIndex, 1);
    updateSections(updatedSections);

    setSelectedRecordIndex(null);
    setEditingRecordData(null);
    setDeleteDialogOpen(false);
  };

  const confirmDeleteSection = () => {
    const updatedSections = [...sections];
    updatedSections.splice(selectedSectionIndex, 1);
    updateSections(updatedSections);
  
    setSelectedSectionIndex(null);
    setEditingSectionHeader("");
    setSelectedRecordIndex(null);
    setEditingRecordData(null);
  };
  

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleOpenAdminPanel = () => {
    setPasswordDialogOpen(true);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === "admin") {
      setIsAdminVisible(true);
      setPasswordDialogOpen(false);
      localStorage.setItem("isAdminVisible", "true");
      setPassword(""); 
    } else {
      alert("Неправильний пароль");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handlePasswordSubmit();
    }
  };

  const handleCloseAdminPanel = () => {
    setIsAdminVisible(false);
    localStorage.setItem("isAdminVisible", "false");
  };

  const toggleAdminCollapse = () => {
    setAdminCollapsed((prev) => !prev);
  };


  const renderAdminPanelContent = () => {
    if (!isAdminVisible) return null;
  
    const isValidSectionIndex =
      selectedSectionIndex !== null &&
      selectedSectionIndex >= 0 &&
      selectedSectionIndex < sections.length;
  
    const currentSection = isValidSectionIndex ? sections[selectedSectionIndex] : null;
    const files = currentSection ? currentSection.files || [] : [];

    return (
      <div>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography
            variant="h6"
            onClick={() => { setExpanded(!expanded); toggleAdminCollapse(); }}
            sx={{
              cursor: "pointer",
              mb: 2,
              backgroundColor: "#236c3d",  
              color: "white",            
              padding: "8px 16px",       
              borderRadius: "4px",       
            }}
          >
            {expanded ? "▲ Додати запис або секцію" : "▼ Додати запис або секцію"}
          </Typography>
          <CloseIcon sx={{ cursor: "pointer", color: "red" }} onClick={handleCloseAdminPanel} />
        </Box>

        <Collapse in={!adminCollapsed}>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Оберіть секцію</InputLabel>
              <Select
                value={selectedSectionIndex !== null ? selectedSectionIndex : ""}
                onChange={handleSectionChange}
                label="Оберіть секцію"
              >
                {sections.map((section, index) => (
                  <MenuItem key={index} value={index}>{section.header}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {isValidSectionIndex && (
              <div>
                <TextField
                  fullWidth
                  label="Назва секції"
                  value={editingSectionHeader}
                  onChange={handleSectionHeaderChange}
                  sx={{ mb: 2 }}
                />
                <Box>
                  <Button
                    onClick={saveEditedSection}
                    variant="contained"
                    color="primary"
                    sx={{ mr: 2 }}
                  >
                    Зберегти секцію
                  </Button>
                  <Button
                    onClick={confirmDeleteSection}
                    variant="outlined"
                    color="error"
                  >
                    Видалити секцію
                  </Button>
                  <Button
                    onClick={() => {
                      const updatedSections = [...sections];
                      const newSection = { header: "Нова секція", files: [{ description: "", url: "", label: "" }] };
                      updatedSections.push(newSection);
                      updateSections(updatedSections);
                      setSelectedSectionIndex(updatedSections.length - 1);
                      setEditingSectionHeader(newSection.header);
                      setSelectedRecordIndex(0);
                      setEditingRecordData(newSection.files[0]);
                    }}
                    variant="outlined"
                    color="primary"
                    sx={{ ml: 2 }}
                  >
                    Додати секцію
                  </Button>
                </Box>
              </div>
            )}

            {isValidSectionIndex && (
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Оберіть запис</InputLabel>
                <Select
                  value={selectedRecordIndex !== null ? selectedRecordIndex : ""}
                  onChange={handleRecordChange}
                  label="Оберіть запис"
                >
                  <MenuItem value="">Новий запис</MenuItem>
                  {files.length > 0 ? (
                    files.map((file, index) => (
                      <MenuItem key={index} value={index}>
                        {file.description || `Запис ${index + 1}`}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled value="">
                      Немає записів
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            )}
          </Box>

        {editingRecordData && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Редагування запису</Typography>
            <TextField
              fullWidth
              label="Опис"
              value={editingRecordData.description || ""}
              onChange={(e) => handleRecordEditingChange("description", e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="URL"
              value={editingRecordData.url || ""}
              onChange={(e) => handleRecordEditingChange("url", e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Мітка"
              value={editingRecordData.label || ""}
              onChange={(e) => handleRecordEditingChange("label", e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box>
              <Button onClick={saveEditedRecord} variant="contained" color="primary" sx={{ mr: 2 }}>Зберегти</Button>
              <Button onClick={openDeleteDialog} variant="outlined" color="error">Видалити</Button>
              <Button
                onClick={() => {
                  const updatedSections = [...sections];
                  const newRecord = { description: "", url: "", label: "" };
                  updatedSections[selectedSectionIndex].files.push(newRecord);
                  updateSections(updatedSections);
                  setSelectedRecordIndex(updatedSections[selectedSectionIndex].files.length - 1);
                  setEditingRecordData(newRecord);
                }}
                variant="outlined"
                color="primary"
                sx={{ ml: 2 }}
              >
                Додати запис
              </Button>
            </Box>
          </Box>
        )}
      </Collapse>
          
        <Dialog open={deleteDialogOpen} onClose={cancelDelete}>
          <DialogTitle>Підтвердження видалення</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Ви впевнені, що хочете видалити цей запис? Цю дію не можна скасувати.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDelete} color="primary">Скасувати</Button>
            <Button onClick={confirmDeleteRecord} color="error">Видалити</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const renderAdminButton = () => {
    if (isAdminVisible) return null;

    return (
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          left: 20,
          bgcolor: "primary.main",
          color: "white",
          p: 1,
          borderRadius: "50%",
          cursor: "pointer",
          opacity: 0,
          transition: "opacity 0.3s",
          ":hover": { opacity: 1, bgcolor: "primary.dark" },
        }}
        onClick={handleOpenAdminPanel}
      >
        Адмінка
      </Box>
    );
  };

  const renderPasswordDialog = () => (
    <Dialog
      open={passwordDialogOpen}
      onClose={() => {
        setPasswordDialogOpen(false);
        setPassword("");
      }}
    >
      <DialogTitle>Введіть пароль</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Пароль"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          onKeyPress={handleKeyPress}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setPasswordDialogOpen(false);
            setPassword("");
          }}
          color="primary"
        >
          Скасувати
        </Button>
        <Button onClick={handlePasswordSubmit} color="primary">
          Підтвердити
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div>
      {renderAdminPanelContent()}
      {renderAdminButton()}
      {renderPasswordDialog()}
    </div>
  );
};

export default AdminPanel;