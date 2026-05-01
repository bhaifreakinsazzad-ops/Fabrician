import { useState } from 'react';
import { Palette, MessageSquare } from 'lucide-react';
import { useStudio } from '@/store/useStudio';
import { getStudioStatusLabel } from '@/lib/utils';
import { cn } from '@/lib/utils';

const GOLD      = '#C7A36A';
const GOLD_DEEP = '#9E7E5D';
const NAVY      = '#141B2C';
const GOLD_STRIP = 'linear-gradient(90deg, #C8A57A 0%, #D4B896 50%, #B8924A 100%)';

const statusOptions = ['All', 'Submitted', 'Under Review', 'Concept Ready', 'Waitlist', 'Future Eligible', 'Rejected'];

export default function AdminStudio() {
  const { submissions, updateSubmissionStatus } = useStudio();
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = submissions.filter((s) => {
    if (statusFilter === 'All') return true;
    return s.status === statusFilter.toLowerCase().replace(/ /g, '_');
  });

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Admin · Studio</p>
        <h1 className="text-2xl font-display font-semibold">Studio Submissions</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Review design concepts from customers</p>
      </div>

      {/* Status filter pills */}
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((status) => {
          const isActive = statusFilter === status;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className="px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
              style={isActive
                ? {
                    background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DEEP} 100%)`,
                    color: NAVY,
                    boxShadow: '0 2px 10px rgba(199,163,106,0.25)',
                  }
                : {}
              }
            >
              <span className={cn(!isActive && 'text-muted-foreground')}>{status}</span>
            </button>
          );
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="relative inline-flex mb-6">
            <div
              className="absolute inset-0 rounded-full blur-xl"
              style={{ backgroundColor: 'rgba(199,163,106,0.20)' }}
            />
            <div
              className="relative w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(199,163,106,0.12)',
                border: '1px solid rgba(199,163,106,0.25)',
              }}
            >
              <Palette className="w-7 h-7" style={{ color: GOLD }} />
            </div>
          </div>
          <p className="font-display text-lg font-semibold mb-1">No submissions yet</p>
          <p className="text-sm text-muted-foreground">
            Design concepts will appear here once customers use Fabrician Studio.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((sub) => {
            const statusLabel = getStudioStatusLabel(sub.status);
            return (
              <div
                key={sub.id}
                className="rounded-2xl bg-card border border-border/40 shadow-card overflow-hidden relative"
              >
                {/* Gold top strip */}
                <div className="h-0.5" style={{ background: GOLD_STRIP }} />

                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(199,163,106,0.12)' }}
                    >
                      <Palette className="w-5 h-5" style={{ color: GOLD }} />
                    </div>
                    <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium', statusLabel.color)}>
                      {statusLabel.label}
                    </span>
                  </div>

                  <p className="font-medium text-sm mb-1">{sub.designData.goal || 'Custom Design'}</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    {sub.userName || 'Anonymous'} · {new Date(sub.createdAt).toLocaleDateString()}
                  </p>

                  <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
                    {sub.designData.ageRange && <p>Age: {sub.designData.ageRange}</p>}
                    {sub.designData.size && <p>Size: {sub.designData.size}</p>}
                    {sub.designData.styleMood && <p>Style: {sub.designData.styleMood}</p>}
                    {sub.designData.occasion && <p>Occasion: {sub.designData.occasion}</p>}
                    {sub.designData.personalization.customText && (
                      <p>Text: "{sub.designData.personalization.customText}"</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={sub.status}
                      onChange={(e) => updateSubmissionStatus(sub.id, e.target.value as any)}
                      className="flex-1 text-xs rounded-lg border border-input bg-background px-2 py-1.5"
                    >
                      <option value="submitted">Submitted</option>
                      <option value="under_review">Under Review</option>
                      <option value="concept_ready">Concept Ready</option>
                      <option value="waitlist">Waitlist</option>
                      <option value="future_eligible">Future Eligible</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button className="p-2 rounded-lg hover:bg-muted transition-colors" title="Comment">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
