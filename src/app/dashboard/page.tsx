"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { FileText, Trash2, BarChart3, LogOut, User } from "lucide-react";

interface Resume {
  id: string;
  name: string;
  template: string;
  created_at: string;
}

interface JobMatch {
  id: string;
  job_title: string;
  company: string;
  match_score: number;
  created_at: string;
}

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    const load = async () => {
      try {
        const [resumesRes, matchesRes] = await Promise.all([
          supabase.from("resumes").select("*").order("created_at", { ascending: false }),
          supabase.from("job_matches").select("*").order("created_at", { ascending: false }),
        ]);

        if (!cancelled) {
          if (resumesRes.data) setResumes(resumesRes.data);
          if (matchesRes.data) setJobMatches(matchesRes.data);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Error fetching data:", error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const handleDeleteResume = async (id: string) => {
    await supabase.from("resumes").delete().eq("id", id);
    setResumes((prev) => prev.filter((r) => r.id !== id));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your dashboard</h1>
          <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Sign In →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-lg text-gray-600">Manage your resumes and job matches</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                {user.email}
              </div>
              <button
                onClick={signOut}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
              <Link
                href="/builder"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
              >
                <FileText className="w-5 h-5" />
                Create New Resume
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Saved Resumes */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Saved Resumes</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {resumes.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">No resumes yet. Create your first resume!</div>
                ) : (
                  resumes.map((resume) => (
                    <div key={resume.id} className="p-5 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-gray-900">{resume.name}</h3>
                            <p className="text-sm text-gray-500">
                              {resume.template} • Created {new Date(resume.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/builder?resumeId=${resume.id}`}
                            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleDeleteResume(resume.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Job Matches */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Recent Job Matches</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {jobMatches.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">No job matches yet. Analyze a resume!</div>
                ) : (
                  jobMatches.map((match) => (
                    <div key={match.id} className="p-5 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <BarChart3 className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-gray-900">{match.job_title} at {match.company}</h3>
                            <p className="text-sm text-gray-500">Matched on {new Date(match.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className={`text-2xl font-bold ${match.match_score >= 80 ? "text-emerald-600" : "text-amber-600"}`}>
                          {match.match_score}%
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
