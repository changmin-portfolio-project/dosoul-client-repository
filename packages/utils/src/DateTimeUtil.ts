export const DateTimeUtil = {
  formatDate: (date: Date): string => {
    return date.toLocaleDateString('ko-KR');
  },
  
  formatDateTime: (date: Date): string => {
    return date.toLocaleString('ko-KR');
  },
  
  getRelativeTime: (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return '오늘';
    if (days === 1) return '어제';
    if (days < 7) return `${days}일 전`;
    return DateTimeUtil.formatDate(date);
  }
};
