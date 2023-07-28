export const formatDate = (updatedAt) => {
    return new Intl.DateTimeFormat("en-GB", {
        timeStyle: 'medium',
        timeZone: 'UTC'
    }).format(updatedAt);
  };
  