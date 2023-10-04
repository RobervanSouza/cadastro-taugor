
import { Dialog, DialogTitle, Button, Typography } from "@mui/material";

import styles from "./styles.module.scss";

interface HistoricoCargoModalProps {
  open: boolean;
  onClose: () => void;
  historico: string[] | undefined;
}

function HistoricoCargoModal({
  open,
  onClose,
  historico,
}: HistoricoCargoModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <div className={styles.geral}>
        <DialogTitle>
          <h1>Histórico de Cargos</h1>
        </DialogTitle>
        <div className={styles.historico}>
          <h4>Histórico de Cargo</h4>
          {historico && historico.length > 0 ? (
            historico.map((cargo, index) => (
              <Typography key={index} variant="body1">
                <span style={{ color: "#06a0ec" }}>{index + 1}° Cargo:</span>
                <span style={{ color: "black" }}> {cargo}</span>
              </Typography>
            ))
          ) : (
            <Typography
              
              style={{ color: "#06a0ec" }}
              variant="body1">
              Nenhum histórico de Cargo!!!.
            </Typography>
          )}
        </div>

        <Button
          onClick={onClose}
          type="button"
          variant="contained"
          color="primary">
          Fechar
        </Button>
      </div>
    </Dialog>
  );
}

export default HistoricoCargoModal;
