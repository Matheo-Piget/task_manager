// Ajoutez ces fonctions à la fin du fichier existant

export const getCompletionTrends = async (timeRange) => {
  try {
    // Pour le développement, retourne des données fictives
    return [
      { date: '2025-03-15', completed: 3, added: 5 },
      { date: '2025-03-16', completed: 2, added: 1 },
      { date: '2025-03-17', completed: 4, added: 2 },
      { date: '2025-03-18', completed: 1, added: 3 },
      { date: '2025-03-19', completed: 5, added: 2 },
      { date: '2025-03-20', completed: 3, added: 4 },
      { date: '2025-03-21', completed: 2, added: 1 }
    ];
  } catch (error) {
    console.error('Error fetching completion trends:', error);
    throw error;
  }
};

export const getProductivityMetrics = async () => {
  try {
    // Données fictives pour le développement
    return {
      completionRate: 75,
      averageCompletionTime: 2.3,
      tasksCompletedThisWeek: 12,
      overdueTasks: 3
    };
  } catch (error) {
    console.error('Error fetching productivity metrics:', error);
    throw error;
  }
};

export const getTaskDistribution = async (type) => {
  try {
    // Données fictives selon le type
    if (type === 'status') {
      return {
        TODO: 5,
        IN_PROGRESS: 3,
        DONE: 8,
        ARCHIVED: 2
      };
    } else if (type === 'priority') {
      return {
        LOW: 4,
        MEDIUM: 7,
        HIGH: 5,
        URGENT: 2
      };
    } else {
      return {
        'Project A': 6,
        'Project B': 4,
        'Project C': 8
      };
    }
  } catch (error) {
    console.error('Error fetching task distribution:', error);
    throw error;
  }
};

export const getCompletionRateByTags = async () => {
  try {
    // Données fictives
    return [
      { name: 'Bug', completion: 80 },
      { name: 'Feature', completion: 60 },
      { name: 'Documentation', completion: 90 },
      { name: 'Research', completion: 45 }
    ];
  } catch (error) {
    console.error('Error fetching tag completion rates:', error);
    throw error;
  }
};