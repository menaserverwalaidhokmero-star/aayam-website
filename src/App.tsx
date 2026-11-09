/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DiscoverySection } from './components/DiscoverySection';
import { ToolsSection } from './components/ToolsSection';
import { DashboardSection } from './components/DashboardSection';
import { CommunitySection } from './components/CommunitySection';
import { ArticlesSection } from './components/ArticlesSection';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { SettingsModal } from './components/SettingsModal';
import { soundEngine } from './utils/soundEngine';
import {
  INITIAL_DISCOVERIES,
  INITIAL_COMMUNITY_SPARKS,
  INITIAL_PROJECT_TASKS,
  EDITORIAL_ARTICLES,
  INITIAL_USER_PROFILE
} from './data/mockData';
import { DiscoveryItem, CommunitySpark, ProjectTask, UserProfile } from './types';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('aayam_theme_v1') || localStorage.getItem('randi_theme_v1') || localStorage.getItem('nova_theme_v1');
    return saved === 'light' ? 'light' : 'dark';
  });

  // Sound enabled state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('aayam_sound_enabled_v1') || localStorage.getItem('randi_sound_enabled_v1') || localStorage.getItem('nova_sound_enabled_v1');
    return saved !== null ? saved === 'true' : true;
  });

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('aayam_profile_v1') || localStorage.getItem('randi_profile_v1') || localStorage.getItem('nova_profile_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_USER_PROFILE;
  });

  // Discoveries
  const [discoveries, setDiscoveries] = useState<DiscoveryItem[]>(() => {
    const saved = localStorage.getItem('aayam_discoveries_v1') || localStorage.getItem('randi_discoveries_v1') || localStorage.getItem('nova_discoveries_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_DISCOVERIES;
  });

  // Community Sparks
  const [sparks, setSparks] = useState<CommunitySpark[]>(() => {
    const saved = localStorage.getItem('aayam_sparks_v1') || localStorage.getItem('randi_sparks_v1') || localStorage.getItem('nova_sparks_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_COMMUNITY_SPARKS;
  });

  // Tasks
  const [tasks, setTasks] = useState<ProjectTask[]>(() => {
    const saved = localStorage.getItem('aayam_tasks_v1') || localStorage.getItem('randi_tasks_v1') || localStorage.getItem('nova_tasks_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_PROJECT_TASKS;
  });

  // Focus Minutes
  const [focusMinutes, setFocusMinutes] = useState<number>(() => {
    const saved = localStorage.getItem('aayam_focus_minutes_v1') || localStorage.getItem('randi_focus_minutes_v1') || localStorage.getItem('nova_focus_minutes_v1');
    return saved ? parseInt(saved, 10) : 45;
  });

  // Active section for header highlighting
  const [activeSection, setActiveSection] = useState('discoveries');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Sync theme to <html> tag
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('aayam_theme_v1', theme);
  }, [theme]);

  // Sync sound setting to engine
  useEffect(() => {
    soundEngine.setMuted(!soundEnabled);
    localStorage.setItem('aayam_sound_enabled_v1', String(soundEnabled));
  }, [soundEnabled]);

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('aayam_discoveries_v1', JSON.stringify(discoveries));
  }, [discoveries]);

  useEffect(() => {
    localStorage.setItem('aayam_sparks_v1', JSON.stringify(sparks));
  }, [sparks]);

  useEffect(() => {
    localStorage.setItem('aayam_tasks_v1', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('aayam_profile_v1', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('aayam_focus_minutes_v1', String(focusMinutes));
  }, [focusMinutes]);

  // Handle global shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleToggleBookmark = useCallback((id: string) => {
    setDiscoveries(prev =>
      prev.map(item =>
        item.id === id ? { ...item, bookmarked: !item.bookmarked } : item
      )
    );
  }, []);

  const handleToggleLike = useCallback((id: string) => {
    setDiscoveries(prev =>
      prev.map(item =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  }, []);

  const handleToggleTask = useCallback((taskId: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
  }, []);

  const handleAddTask = useCallback((newTask: Omit<ProjectTask, 'id' | 'createdAt'>) => {
    const task: ProjectTask = {
      ...newTask,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks(prev => [task, ...prev]);
  }, []);

  const handleDeleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  }, []);

  const handleLikeSpark = useCallback((sparkId: string) => {
    setSparks(prev =>
      prev.map(s => {
        if (s.id !== sparkId) return s;
        const willLike = !s.userLiked;
        return {
          ...s,
          userLiked: willLike,
          likes: willLike ? s.likes + 1 : s.likes - 1
        };
      })
    );
  }, []);

  const handleAddSpark = useCallback(
    (sparkData: Omit<CommunitySpark, 'id' | 'timestamp' | 'likes' | 'userLiked' | 'comments'>) => {
      const newSpark: CommunitySpark = {
        ...sparkData,
        id: `spark-${Date.now()}`,
        timestamp: 'Just now',
        likes: 1,
        userLiked: true,
        comments: []
      };
      setSparks(prev => [newSpark, ...prev]);
    },
    []
  );

  const handleAddComment = useCallback((sparkId: string, text: string) => {
    setSparks(prev =>
      prev.map(s => {
        if (s.id !== sparkId) return s;
        return {
          ...s,
          comments: [
            ...s.comments,
            {
              id: `c-${Date.now()}`,
              author: userProfile.name,
              avatar: userProfile.avatarUrl,
              text,
              timestamp: 'Just now'
            }
          ]
        };
      })
    );
  }, [userProfile]);

  const handleFocusCompleted = useCallback((minutes: number) => {
    setFocusMinutes(prev => prev + minutes);
  }, []);

  const handleResetData = useCallback(() => {
    setDiscoveries(INITIAL_DISCOVERIES);
    setSparks(INITIAL_COMMUNITY_SPARKS);
    setTasks(INITIAL_PROJECT_TASKS);
    setUserProfile(INITIAL_USER_PROFILE);
    setFocusMinutes(45);
    localStorage.clear();
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const savedDiscoveries = discoveries.filter(d => d.bookmarked);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#07090E] text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* Top Bar Navigation */}
      <Header
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        theme={theme}
        onToggleTheme={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(prev => !prev)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onExploreDiscoveries={() => scrollToSection('discoveries')}
          onOpenStudioTools={() => scrollToSection('tools')}
        />

        {/* 2. Horizon Discoveries Feed */}
        <DiscoverySection
          discoveries={discoveries}
          onToggleBookmark={handleToggleBookmark}
          onToggleLike={handleToggleLike}
        />

        {/* 3. Studio Interactive Tools */}
        <ToolsSection onFocusCompleted={handleFocusCompleted} />

        {/* 4. Personalized Horizon Deck (Dashboard) */}
        <DashboardSection
          userProfile={userProfile}
          savedDiscoveries={savedDiscoveries}
          tasks={tasks}
          onToggleBookmark={handleToggleBookmark}
          onToggleTask={handleToggleTask}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          focusMinutes={focusMinutes}
        />

        {/* 5. Community Sparks & Inquiries */}
        <CommunitySection
          sparks={sparks}
          userProfile={userProfile}
          onLikeSpark={handleLikeSpark}
          onAddSpark={handleAddSpark}
          onAddComment={handleAddComment}
        />

        {/* 6. Horizon Essays & Editorial */}
        <ArticlesSection articles={EDITORIAL_ARTICLES} />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Spotlight Command Palette Modal */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        discoveries={discoveries}
        articles={EDITORIAL_ARTICLES}
        sparks={sparks}
        onSelectDiscovery={_d => scrollToSection('discoveries')}
        onNavigateSection={scrollToSection}
        onToggleTheme={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
      />

      {/* Profile & Studio Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        profile={userProfile}
        onUpdateProfile={setUserProfile}
        onResetData={handleResetData}
      />
    </div>
  );
}
