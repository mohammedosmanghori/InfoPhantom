import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  Filter,
  ArrowUpDown,
  Share2,
  Copy,
  Check,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { ChecklistItem, Priority } from '../types';
import { PriorityBadge } from './Badges';

interface ChecklistViewProps {
  items: ChecklistItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (item: Omit<ChecklistItem, 'id'>) => void;
  onDeleteItem: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
}

export function ChecklistView({
  items,
  onToggleItem,
  onAddItem,
  onDeleteItem,
  onUpdateNotes,
}: ChecklistViewProps) {
  const [filterPriority, setFilterPriority] = useState<'ALL' | Priority>('ALL');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PENDING' | 'DONE'>('ALL');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesBuffer, setNotesBuffer] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>('HIGH');
  const [newTaskCategory, setNewTaskCategory] = useState('Primary Source');
  const [newTaskAction, setNewTaskAction] = useState('');

  const [copied, setCopied] = useState(false);

  // Progress metrics
  const totalCount = items.length;
  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredItems = items.filter((item) => {
    if (filterPriority !== 'ALL' && item.priority !== filterPriority) return false;
    if (filterStatus === 'PENDING' && item.completed) return false;
    if (filterStatus === 'DONE' && !item.completed) return false;
    return true;
  });

  const handleCreateTask = () => {
    if (!newTaskTitle.trim()) return;
    onAddItem({
      task: newTaskTitle.trim(),
      priority: newTaskPriority,
      category: newTaskCategory.trim() || 'General Verification',
      sourceReference: 'User Follow-up',
      verificationAction: newTaskAction.trim() || 'Verify with custodian authority.',
      completed: false,
    });
    setNewTaskTitle('');
    setNewTaskAction('');
    setIsAddingNew(false);
  };

  const handleCopyChecklist = () => {
    const text = items
      .map(
        (it) =>
          `[${it.completed ? 'x' : ' '}] (${it.priority}) ${it.task}\n    Action: ${it.verificationAction}${
            it.notes ? `\n    Note: ${it.notes}` : ''
          }`
      )
      .join('\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <CheckSquare className="w-4 h-4" />
            </span>
            <h1 className="text-xl lg:text-2xl font-extrabold text-white">
              Prioritized Verification Checklist
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Actionable inquiries generated to resolve identified dark spots and eliminate application risks.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleCopyChecklist}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111c34] hover:bg-[#192a4e] text-slate-200 border border-slate-700/60 text-xs font-medium transition-all cursor-pointer"
            title="Copy checklist text to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Checklist</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Progress Card */}
      <div className="p-5 rounded-2xl bg-[#0c1427] border border-[#1e2f52] shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                Verification Readiness Score
              </span>
              <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                {progressPercent}% Complete
              </span>
            </div>
            <p className="text-xs text-slate-300">
              {completedCount} of {totalCount} critical inquiries resolved
            </p>
          </div>

          <div className="text-right font-mono text-2xl font-black text-white">
            {completedCount}/{totalCount}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 rounded-full bg-[#080d1a] border border-[#1c2a47] overflow-hidden p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Add Task Modal / Inline Form */}
      {isAddingNew && (
        <div className="p-5 rounded-2xl bg-[#0e172e] border border-cyan-500/40 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-cyan-300">
              Add Custom Verification Task
            </h3>
            <button
              onClick={() => setIsAddingNew(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Task description (e.g. Call registrar regarding sophomore renewal GPA)"
            className="w-full px-3.5 py-2 rounded-xl bg-[#080d1a] border border-[#203154] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">
                Priority
              </label>
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as Priority)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-[#080d1a] border border-[#203154] text-white text-xs"
              >
                <option value="CRITICAL">CRITICAL</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">
                Category
              </label>
              <input
                type="text"
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value)}
                placeholder="Category (e.g. Eligibility)"
                className="w-full px-2.5 py-1.5 rounded-lg bg-[#080d1a] border border-[#203154] text-white text-xs"
              >
              </input>
            </div>

            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">
                Action Step
              </label>
              <input
                type="text"
                value={newTaskAction}
                onChange={(e) => setNewTaskAction(e.target.value)}
                placeholder="Action step or URL to check"
                className="w-full px-2.5 py-1.5 rounded-lg bg-[#080d1a] border border-[#203154] text-white text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={() => setIsAddingNew(false)}
              className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateTask}
              disabled={!newTaskTitle.trim()}
              className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-all disabled:opacity-50"
            >
              Save Task
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Status Filter */}
        <div className="flex rounded-lg bg-[#0c1427] p-1 border border-[#1b2844]">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              filterStatus === 'ALL'
                ? 'bg-[#182643] text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({items.length})
          </button>
          <button
            onClick={() => setFilterStatus('PENDING')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              filterStatus === 'PENDING'
                ? 'bg-[#182643] text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pending ({items.filter((i) => !i.completed).length})
          </button>
          <button
            onClick={() => setFilterStatus('DONE')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              filterStatus === 'DONE'
                ? 'bg-[#182643] text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Priority Filter */}
        <div className="flex rounded-lg bg-[#0c1427] p-1 border border-[#1b2844]">
          {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                filterPriority === p
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Checklist Items List */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0a1020] border border-[#18263f] space-y-2">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
          <h3 className="text-sm font-semibold text-white">No tasks in this view</h3>
          <p className="text-xs text-slate-400">
            {filterStatus === 'PENDING'
              ? 'All tasks are marked completed!'
              : 'Try selecting a different filter.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const isEditingNotes = editingNotesId === item.id;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all ${
                  item.completed
                    ? 'bg-[#080d18] border-[#152033] opacity-75'
                    : 'bg-[#0c1427] border-[#1d2c4b] hover:border-cyan-500/40 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {/* Checkbox */}
                  <button
                    onClick={() => onToggleItem(item.id)}
                    className="mt-0.5 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer shrink-0"
                    aria-label={item.completed ? 'Mark pending' : 'Mark completed'}
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-500 hover:text-cyan-400" />
                    )}
                  </button>

                  {/* Task Content */}
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <PriorityBadge priority={item.priority} />
                      <span className="font-mono text-[10px] text-slate-400 bg-[#121c32] px-2 py-0.5 rounded border border-[#1e2e4f]">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Source: {item.sourceReference}
                      </span>
                    </div>

                    <h3
                      onClick={() => onToggleItem(item.id)}
                      className={`text-sm font-semibold cursor-pointer select-none ${
                        item.completed
                          ? 'line-through text-slate-400'
                          : 'text-white hover:text-cyan-300'
                      }`}
                    >
                      {item.task}
                    </h3>

                    {/* Action Step */}
                    <div className="p-2.5 rounded-lg bg-[#080d1a] border border-[#18263f] text-xs text-slate-300">
                      <span className="font-semibold text-cyan-400 block mb-0.5">
                        Verification Protocol:
                      </span>
                      {item.verificationAction}
                    </div>

                    {/* Notes Section */}
                    {isEditingNotes ? (
                      <div className="pt-2 space-y-2">
                        <textarea
                          rows={2}
                          value={notesBuffer}
                          onChange={(e) => setNotesBuffer(e.target.value)}
                          placeholder="Record findings, confirmation reference numbers, or contacts..."
                          className="w-full px-3 py-1.5 rounded-lg bg-[#080d1a] border border-cyan-500 text-white text-xs focus:outline-none"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingNotesId(null)}
                            className="text-xs text-slate-400 hover:text-white px-2 py-1"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              onUpdateNotes(item.id, notesBuffer);
                              setEditingNotesId(null);
                            }}
                            className="text-xs bg-cyan-500 text-slate-950 font-semibold px-3 py-1 rounded"
                          >
                            Save Note
                          </button>
                        </div>
                      </div>
                    ) : (
                      item.notes && (
                        <div className="text-xs bg-cyan-950/30 border border-cyan-800/40 p-2 rounded-lg text-cyan-200 font-mono">
                          <span className="text-[10px] uppercase text-cyan-400 block font-bold mb-0.5">
                            Audit Note:
                          </span>
                          {item.notes}
                        </div>
                      )
                    )}
                  </div>

                  {/* Actions (Notes / Delete) */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => {
                        setEditingNotesId(item.id);
                        setNotesBuffer(item.notes || '');
                      }}
                      className="p-1.5 text-slate-500 hover:text-cyan-400 rounded-lg hover:bg-[#131d33] transition-colors"
                      title={item.notes ? 'Edit note' : 'Add note'}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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
