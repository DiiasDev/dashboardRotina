import { Card } from "@mui/material";
import styles from "./styles.module.css";

interface StatsCardProps {
  title: string;
  subtitle: string;
  value: number | string;
}

export function StatsCard({ title, subtitle, value }: StatsCardProps) {
  return (
    <Card className={styles.statCard}>
      <div className={styles.statContent}>
        <h4 className={styles.statTitle}>{title}</h4>
        <span className={styles.statSubtitle}>{subtitle}</span>
      </div>
      <span className={styles.statNumber}>{value}</span>
    </Card>
  );
}