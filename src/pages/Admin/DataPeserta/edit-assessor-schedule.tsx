import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Divider,
  InputAdornment,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import apiClient from "../../../services/api.config";
import { ArrowBack, Save, Search as SearchIcon } from "@mui/icons-material";
import { useUserProfile } from "../../../hooks/useUserProfile";

interface Assessor {
  id: string;
  name: string;
  username: string;
  email: string;
  no_telepon: string;
}

interface Participant {
  id: string;
  nama: string;
  nip: string;
  nik: string;
  email: string;
  no_handphone: string;
  jadwal: string;
  asesor_id: string;
  Assessor?: Assessor;
}

export default function EditAssessorSchedulePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user } = useUserProfile();
  
  const [asesorId, setAsesorId] = useState("");
  const [jadwal, setJadwal] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [searchAssessor, setSearchAssessor] = useState("");
  const [debouncedSearchAssessor, setDebouncedSearchAssessor] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Fetch participant data
  const {
    data: participant,
    isLoading: isLoadingParticipant,
    error: participantError,
  } = useQuery<Participant>({
    queryKey: ["participant", id],
    queryFn: async () => {
      const response = await apiClient.get(`/api/participants/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });

  // Fetch all assessors (initial load)
  const { data: assessorsData, isLoading: isLoadingAssessors } = useQuery({
    queryKey: ["assessors-all"],
    queryFn: async () => {
      const response = await apiClient.get("/api/assessors?limit=1000");
      return response.data;
    },
  });

  // Fetch filtered assessors (when searching)
  const { data: filteredAssessorsData, isFetching: isFetchingFiltered } = useQuery({
    queryKey: ["assessors-search", debouncedSearchAssessor],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("limit", "1000");
      params.append("search", debouncedSearchAssessor);
      const response = await apiClient.get(`/api/assessors?${params.toString()}`);
      return response.data;
    },
    enabled: debouncedSearchAssessor.length > 0,
    staleTime: 30000, // Cache for 30 seconds
  });

  // Debounce search assessor
  useEffect(() => {
    if (searchAssessor) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setDebouncedSearchAssessor(searchAssessor);
        setIsSearching(false);
      }, 500);

      return () => {
        clearTimeout(timer);
        setIsSearching(false);
      };
    } else {
      setDebouncedSearchAssessor("");
      setIsSearching(false);
    }
  }, [searchAssessor]);

  // Set initial values when participant data is loaded
  useEffect(() => {
    if (participant) {
      setAsesorId(participant.asesor_id || "");
      setJadwal(participant.jadwal || "");
    }
  }, [participant]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (data: { asesor_id: string; jadwal: string }) => {
      const response = await apiClient.put(
        `/api/participants/${id}/assessor-schedule`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participant", id] });
      queryClient.invalidateQueries({ queryKey: ["peserta-all"] });
      navigate("/dashboard/data-peserta");
    },
    onError: (error: any) => {
      console.error("Update error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: { [key: string]: string } = {};
    
    if (!asesorId) {
      newErrors.asesorId = "Asesor harus dipilih";
    }
    
    if (!jadwal) {
      newErrors.jadwal = "Jadwal harus diisi";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    updateMutation.mutate({ asesor_id: asesorId, jadwal });
  };

  if (isLoadingParticipant || isLoadingAssessors) {
    return (
      <DashboardLayout
        userRole="admin"
        userName={user?.name || ""}
        userEmail={user?.email || ""}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  if (participantError) {
    return (
      <DashboardLayout
        userRole="admin"
        userName={user?.name || ""}
        userEmail={user?.email || ""}
      >
        <Alert severity="error">
          Gagal memuat data peserta. Silakan coba lagi.
        </Alert>
      </DashboardLayout>
    );
  }

  // Get assessors to display based on search state
  const displayAssessors = searchAssessor 
    ? (filteredAssessorsData?.data || [])
    : (assessorsData?.data || []);
  
  const allAssessors = assessorsData?.data || [];
  const isLoadingSearch = isSearching || isFetchingFiltered;

  return (
    <DashboardLayout
      userRole="admin"
      userName={user?.name || ""}
      userEmail={user?.email || ""}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate("/dashboard/data-peserta")}
          >
            Kembali
          </Button>
          <Typography variant="h4" fontWeight="bold">
            Update Asesor & Jadwal Peserta
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Participant Info Card */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Informasi Peserta
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Nama
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {participant?.nama}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    NIK
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {participant?.nik}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {participant?.email || "-"}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    No. Handphone
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {participant?.no_handphone || "-"}
                  </Typography>
                </Box>

                {participant?.Assessor && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      Asesor Saat Ini
                    </Typography>
                    <Typography variant="body1" fontWeight="medium" color="primary">
                      {participant.Assessor.name}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Update Form */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Form Update
              </Typography>
              <Divider sx={{ mb: 3 }} />

              {updateMutation.isError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {updateMutation.error instanceof Error
                    ? updateMutation.error.message
                    : "Gagal memperbarui data. Silakan coba lagi."}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Cari dan Pilih Asesor Baru *
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Ketik nama atau username asesor untuk mencari..."
                    value={searchAssessor}
                    onChange={(e) => setSearchAssessor(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      endAdornment: isLoadingSearch && (
                        <InputAdornment position="end">
                          <CircularProgress size={20} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />
                  
                  {/* List asesor - tampil di awal atau hasil pencarian */}
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      maxHeight: 300, 
                      overflow: 'auto',
                      mb: 2
                    }}
                  >
                    {isLoadingSearch ? (
                      <Box sx={{ p: 2, textAlign: 'center' }}>
                        <CircularProgress size={24} />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Mencari asesor...
                        </Typography>
                      </Box>
                    ) : displayAssessors.length === 0 ? (
                      <Box sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          {searchAssessor ? 'Tidak ada asesor yang ditemukan' : 'Tidak ada data asesor'}
                        </Typography>
                      </Box>
                    ) : (
                      <Box>
                        {displayAssessors.map((assessor: Assessor) => (
                          <Box
                            key={assessor.id}
                            onClick={() => {
                              setAsesorId(assessor.id);
                              setSearchAssessor("");
                              setErrors({ ...errors, asesorId: "" });
                            }}
                            sx={{
                              p: 2,
                              cursor: 'pointer',
                              borderBottom: '1px solid',
                              borderColor: 'divider',
                              bgcolor: asesorId === assessor.id ? 'primary.light' : 'transparent',
                              '&:hover': {
                                bgcolor: asesorId === assessor.id ? 'primary.light' : 'action.hover',
                              },
                              '&:last-child': {
                                borderBottom: 'none',
                              }
                            }}
                          >
                            <Typography variant="body1" fontWeight="medium">
                              {assessor.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {assessor.username} • {assessor.email}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Paper>
                  
                  {errors.asesorId && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                      {errors.asesorId}
                    </Typography>
                  )}
                </Box>

                <FormControl
                  fullWidth
                  sx={{ mb: 3 }}
                  disabled
                >
                  <InputLabel>Asesor Terpilih</InputLabel>
                  <Select
                    value={asesorId}
                    label="Asesor Terpilih"
                  >
                    <MenuItem value="">
                      <em>Belum ada asesor yang dipilih</em>
                    </MenuItem>
                    {allAssessors.map((assessor: Assessor) => (
                      <MenuItem key={assessor.id} value={assessor.id}>
                        {assessor.name} - {assessor.username}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Jadwal *"
                  type="date"
                  value={jadwal}
                  onChange={(e) => {
                    setJadwal(e.target.value);
                    setErrors({ ...errors, jadwal: "" });
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.jadwal}
                  helperText={errors.jadwal}
                  sx={{ mb: 3 }}
                />

                <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/dashboard/data-peserta")}
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                    disabled={updateMutation.isPending}
                  >
                    {updateMutation.isPending ? (
                      <>
                        <CircularProgress size={20} sx={{ mr: 1 }} />
                        Menyimpan...
                      </>
                    ) : (
                      "Simpan Perubahan"
                    )}
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
