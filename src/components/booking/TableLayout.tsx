import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface TableData {
  id: string;
  number: number;
  seats: number;
  x: number;
  y: number;
  isAvailable: boolean;
  type: 'round' | 'square' | 'rectangular';
}

interface TableLayoutProps {
  tables: TableData[];
  selectedTableId?: string;
  onSelectTable: (tableId: string) => void;
}

export function TableLayout({ tables, selectedTableId, onSelectTable }: TableLayoutProps) {
  return (
    <div className="relative aspect-[4/3] w-full rounded-2xl bg-muted/50 border-2 border-dashed border-border p-4">
      {/* Window indicator */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary/30 rounded-r" />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground -rotate-90">
        Window
      </span>

      {/* Entrance indicator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-16 bg-sage rounded-t" />
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground">
        Entrance
      </span>

      {/* Tables */}
      {tables.map((table) => (
        <button
          key={table.id}
          onClick={() => table.isAvailable && onSelectTable(table.id)}
          disabled={!table.isAvailable}
          className={cn(
            "absolute flex items-center justify-center transition-all duration-200",
            table.type === 'round' && "rounded-full",
            table.type === 'square' && "rounded-lg aspect-square",
            table.type === 'rectangular' && "rounded-lg",
            table.isAvailable
              ? selectedTableId === table.id
                ? "bg-primary text-primary-foreground shadow-glow scale-110"
                : "bg-card border-2 border-border hover:border-primary hover:shadow-soft"
              : "bg-muted text-muted-foreground cursor-not-allowed",
            table.seats <= 2 && "h-10 w-10",
            table.seats > 2 && table.seats <= 4 && "h-12 w-12",
            table.seats > 4 && "h-14 w-20"
          )}
          style={{
            left: `${table.x}%`,
            top: `${table.y}%`,
            transform: `translate(-50%, -50%) ${selectedTableId === table.id ? 'scale(1.1)' : ''}`,
          }}
        >
          <span className="text-xs font-semibold">{table.number}</span>
        </button>
      ))}
    </div>
  );
}
