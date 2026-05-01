import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StudioSubmission, DesignData } from '@/types';

interface StudioState {
  submissions: StudioSubmission[];
  currentDesign: DesignData | null;
  currentStep: number;
  addSubmission: (data: DesignData, referenceImages: string[], userInfo?: { name: string; phone: string }) => void;
  updateSubmissionStatus: (id: string, status: StudioSubmission['status'], adminNotes?: string) => void;
  setCurrentDesign: (design: DesignData | null) => void;
  setCurrentStep: (step: number) => void;
  getUserSubmissions: () => StudioSubmission[];
}

export const useStudio = create<StudioState>()(
  persist(
    (set, get) => ({
      submissions: [],
      currentDesign: null,
      currentStep: 0,

      addSubmission: (data, referenceImages, userInfo) => {
        const submission: StudioSubmission = {
          id: `s${Date.now()}`,
          userId: undefined,
          userName: userInfo?.name,
          userPhone: userInfo?.phone,
          status: 'submitted',
          designData: data,
          referenceImages,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set({ submissions: [...get().submissions, submission] });
      },

      updateSubmissionStatus: (id, status, adminNotes) => {
        set({
          submissions: get().submissions.map((s) =>
            s.id === id ? { ...s, status, adminNotes: adminNotes || s.adminNotes, updatedAt: new Date().toISOString() } : s
          ),
        });
      },

      setCurrentDesign: (design) => set({ currentDesign: design }),
      setCurrentStep: (step) => set({ currentStep: step }),
      getUserSubmissions: () => get().submissions,
    }),
    {
      name: 'fabrician-studio',
    }
  )
);
