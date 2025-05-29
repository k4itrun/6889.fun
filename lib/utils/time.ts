export const formatTime = (ms: number) => {
 const minutes = Math.floor(ms / 60000);
 const seconds = Math.floor((ms % 60000) / 1000);
 return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export function formatElapsedTimeSince(startTimestamp?: number | string): string {
 if (!startTimestamp) return '0m:0s';

 const now = Date.now();
 const start = Number(startTimestamp);
 const elapsed = now - start;

 const seconds = Math.floor((elapsed / 1000) % 60);
 const minutes = Math.floor((elapsed / 1000 / 60) % 60);
 const hours = Math.floor((elapsed / 1000 / 60 / 60) % 24);
 const days = Math.floor((elapsed / 1000 / 60 / 60 / 24) % 7);
 const weeks = Math.floor((elapsed / 1000 / 60 / 60 / 24 / 7) % 4);
 const months = Math.floor(elapsed / 1000 / 60 / 60 / 24 / 30);

 if (months > 0) return `${months} month${months > 1 ? 's' : ''}`;
 if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''}:${days}d:${hours}h`;
 if (days > 0) return `${days}d:${hours}h:${minutes}m`;
 if (hours > 0) return `${hours}h:${minutes}m:${seconds}s`;

 return `${minutes}m:${seconds}s`;
}
