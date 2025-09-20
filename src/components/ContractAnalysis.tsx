import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { motion } from 'framer-motion';
import { Tooltip } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface BertInsights {
  important_terms: string[];
  risk_level: string;
  term_alternatives: Record<string, string[]>;
}

interface ClauseAnalysis {
  clause_type: string;
  original_text: string;
  simplified_summary: string;
  suggested_rewording: string;
  risk_level: string;
  risk_factor_score: number;
  improvement_advice: string;
  bert_insights: BertInsights;
}

interface ContractAnalysisProps {
  analysis: ClauseAnalysis[] | string;
}

// Component to display string analysis in a structured format
const StringAnalysisDisplay = ({ analysis }: { analysis: string }) => {
  const [expandedClauses, setExpandedClauses] = useState<number[]>([]);
  
  // Parse the analysis string to extract structured data
  const parseAnalysis = (text: string) => {
    const lines = text.split('\n');
    const summary = {
      totalClauses: 0,
      highRiskClauses: 0,
      criticalClauses: 0
    };
    
    const clauses: Array<{
      section: string;
      riskLevel: string;
      riskScore: number;
      riskHighlights: Array<{text: string, score: number}>;
      clauseText: string;
      suggestions?: string;
    }> = [];
    
    let currentClause: any = null;
    let inClauseAnalysis = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Extract summary information
      if (line.includes('Total Clauses Analyzed:')) {
        summary.totalClauses = parseInt(line.split(':')[1].trim()) || 0;
      } else if (line.includes('High-Risk Clauses Found:')) {
        summary.highRiskClauses = parseInt(line.split(':')[1].trim()) || 0;
      }
      
      // Start of clause analysis
      if (line === 'CLAUSE ANALYSIS') {
        inClauseAnalysis = true;
        currentClause = {
          section: 'General',
          riskLevel: 'LOW',
          riskScore: 0,
          riskHighlights: [],
          clauseText: ''
        };
      }
      
      // Extract clause details
      if (inClauseAnalysis && currentClause) {
        if (line.startsWith('Section:')) {
          currentClause.section = line.split(':')[1].trim();
        } else if (line.startsWith('Risk Level:')) {
          const riskMatch = line.match(/Risk Level:\s*(\w+)\s*\(Score:\s*([\d.]+)\)/);
          if (riskMatch) {
            currentClause.riskLevel = riskMatch[1];
            currentClause.riskScore = parseFloat(riskMatch[2]);
          }
        } else if (line.startsWith('RISK HIGHLIGHTS:')) {
          // Parse risk highlights
          let j = i + 1;
          while (j < lines.length && lines[j].trim() && !lines[j].startsWith('CLAUSE TEXT')) {
            const highlightLine = lines[j].trim();
            if (highlightLine.startsWith('•')) {
              const match = highlightLine.match(/•\s*'([^']+)'\s*-\s*(\w+)\s*\(([\d.]+)\)/);
              if (match) {
                currentClause.riskHighlights.push({
                  text: match[1],
                  score: parseFloat(match[3])
                });
              }
            }
            j++;
          }
          i = j - 1;
        } else if (line.startsWith('CLAUSE TEXT')) {
          // Extract clause text
          let j = i + 1;
          const clauseTextLines = [];
          while (j < lines.length && lines[j].trim() && !lines[j].startsWith('=')) {
            clauseTextLines.push(lines[j].trim());
            j++;
          }
          currentClause.clauseText = clauseTextLines.join(' ');
          i = j - 1;
        } else if (line.startsWith('SUGGESTIONS:')) {
          // Extract suggestions
          let j = i + 1;
          const suggestionLines = [];
          while (j < lines.length && lines[j].trim() && !lines[j].startsWith('=')) {
            suggestionLines.push(lines[j].trim());
            j++;
          }
          currentClause.suggestions = suggestionLines.join(' ');
          i = j - 1;
        }
        
        // End of clause analysis
        if (line.startsWith('=') && currentClause.clauseText) {
          clauses.push({ ...currentClause });
          currentClause = null;
          inClauseAnalysis = false;
        }
      }
    }
    
    return { summary, clauses };
  };
  
  const { summary, clauses } = parseAnalysis(analysis);
  
  const toggleClause = (index: number) => {
    setExpandedClauses(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  
  const getRiskColor = (riskLevel: string) => {
    switch(riskLevel.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  const getRiskIcon = (riskLevel: string) => {
    switch(riskLevel.toLowerCase()) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'medium': return '⚡';
      case 'low': return '✅';
      default: return 'ℹ️';
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Clauses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalClauses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-600">High-Risk Clauses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{summary.highRiskClauses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clauses.length > 0 ? (clauses.reduce((sum, c) => sum + c.riskScore, 0) / clauses.length).toFixed(2) : '0.00'}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Clauses Analysis */}
      {clauses.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Clause Analysis Results
          </h3>
          {clauses.map((clause, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => toggleClause(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{getRiskIcon(clause.riskLevel)}</span>
                    <div>
                      <CardTitle className="text-base">{clause.section}</CardTitle>
                      <CardDescription className="text-sm">
                        Risk Score: {clause.riskScore.toFixed(2)} | {clause.riskHighlights.length} risk elements
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getRiskColor(clause.riskLevel)}>
                      {clause.riskLevel}
                    </Badge>
                    <svg 
                      className={`w-4 h-4 transition-transform ${expandedClauses.includes(index) ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </CardHeader>
              
              {expandedClauses.includes(index) && (
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Risk Highlights */}
                    {clause.riskHighlights.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm text-red-600 mb-2">⚠️ Risk Elements Found:</h4>
                        <div className="flex flex-wrap gap-2">
                          {clause.riskHighlights.map((highlight, i) => (
                            <Badge key={i} variant="destructive" className="text-xs">
                              {highlight.text} ({highlight.score.toFixed(2)})
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Clause Text */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2">📄 Original Clause:</h4>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-sm">
                        {clause.clauseText}
                      </div>
                    </div>
                    
                    {/* Suggestions */}
                    {clause.suggestions && (
                      <div>
                        <h4 className="font-semibold text-sm text-blue-600 mb-2">💡 Suggested Improvements:</h4>
                        <Alert>
                          <AlertDescription className="text-sm">
                            {clause.suggestions}
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}
                    
                    {/* Rewording Suggestion */}
                    <div>
                      <h4 className="font-semibold text-sm text-green-600 mb-2">✏️ Suggested Rewording:</h4>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md border border-green-200 dark:border-green-800">
                        <p className="text-sm">
                          {clause.riskLevel === 'HIGH' || clause.riskLevel === 'CRITICAL' 
                            ? `Consider revising this clause to reduce risk. Focus on: ${clause.riskHighlights.map(h => h.text).join(', ')}. Make the language more specific and balanced.`
                            : 'This clause appears to be acceptable, but consider reviewing for clarity and specificity.'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-gray-500">
              <p>No detailed clause analysis available.</p>
              <p className="text-sm mt-2">The analysis may be in a different format.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const ContractAnalysis = ({ analysis }: ContractAnalysisProps) => {
  const [activeTab, setActiveTab] = useState('table');
  const [selectedClause, setSelectedClause] = useState<number | null>(null);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  
  // Handle string analysis format
  if (typeof analysis === 'string') {
    return <StringAnalysisDisplay analysis={analysis} />;
  }
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // Reset selected clause when tab changes
  useEffect(() => {
    setSelectedClause(null);
    setExpandedRows([]);
  }, [activeTab]);
  
  const getRiskBadgeClass = (riskLevel: string) => {
    switch(riskLevel.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border border-green-300 dark:border-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border border-yellow-300 dark:border-yellow-700';
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border border-red-300 dark:border-red-700';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600';
    }
  };

  const getRiskColorClass = (riskLevel: string) => {
    switch(riskLevel.toLowerCase()) {
      case 'low':
        return 'text-green-600 dark:text-green-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'high':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };
  
  const toggleExpandRow = (index: number) => {
    setExpandedRows(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };
  
  const isRowExpanded = (index: number) => expandedRows.includes(index);
  
  return (
    <div className="space-y-6">
      {/* Stylish Tab Selector */}
      <div className="flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner">
        <button
          className={`py-2 px-6 rounded-lg transition-all duration-300 ease-in-out flex-1 ${
            activeTab === 'table' 
              ? 'bg-white dark:bg-gray-700 shadow-md transform scale-105' 
              : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('table')}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Table View</span>
          </div>
        </button>
        <button
          className={`py-2 px-6 rounded-lg transition-all duration-300 ease-in-out flex-1 ${
            activeTab === 'document' 
              ? 'bg-white dark:bg-gray-700 shadow-md transform scale-105' 
              : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('document')}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Document View</span>
          </div>
        </button>
      </div>
      
      {activeTab === 'table' ? (
        <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
          <Table>
            <TableCaption className="text-base font-medium pb-4">
              Contract Clause Analysis Results
            </TableCaption>
            <TableHeader className="bg-gray-50 dark:bg-gray-800">
              <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <TableHead className="font-bold w-24">Clause Type</TableHead>
                <TableHead className="font-bold">Original Text</TableHead>
                <TableHead className="font-bold w-24">Risk Level</TableHead>
                <TableHead className="font-bold">Simplified Text</TableHead>
                <TableHead className="font-bold">Suggestion</TableHead>
                <TableHead className="font-bold w-16">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analysis.map((clause, index) => (
                <React.Fragment key={index}>
                  <TableRow 
                    onClick={() => setSelectedClause(selectedClause === index ? null : index)}
                    className={`cursor-pointer transition-colors duration-200 ${
                      selectedClause === index ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    } hover:bg-blue-50 dark:hover:bg-blue-900/10`}
                  >
                    <TableCell className="font-medium">{clause.clause_type}</TableCell>
                    <TableCell className={isRowExpanded(index) ? "" : "max-w-xs truncate"}>
                      {clause.original_text}
                    </TableCell>
                    <TableCell>
                      <span className={`${getRiskBadgeClass(clause.risk_level)} px-3 py-1 rounded-full text-xs font-semibold shadow-sm`}>
                        {clause.risk_level}
                      </span>
                    </TableCell>
                    <TableCell className={isRowExpanded(index) ? "" : "max-w-xs truncate"}>
                      {clause.simplified_summary}
                    </TableCell>
                    <TableCell className={isRowExpanded(index) ? "" : "max-w-xs truncate"}>
                      {clause.suggested_rewording}
                    </TableCell>
                    <TableCell>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpandRow(index);
                        }}
                        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        {isRowExpanded(index) ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </button>
                    </TableCell>
                  </TableRow>
                  {isRowExpanded(index) && (
                    <TableRow className="bg-gray-50 dark:bg-gray-800/50">
                      <TableCell colSpan={6} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Improvement Advice:</h4>
                            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded border">
                              {clause.improvement_advice}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Key Terms:</h4>
                            <div className="flex flex-wrap gap-2">
                              {clause.bert_insights.important_terms.map((term, i) => (
                                <span key={i} className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                                  {term}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <motion.div 
          className="space-y-6" 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {analysis.map((clause, index) => (
            <motion.div 
              key={index} 
              className={`border rounded-lg shadow-sm overflow-hidden transition-all duration-300 ${
                selectedClause === index 
                  ? 'ring-2 ring-blue-400 dark:ring-blue-500 transform scale-102' 
                  : 'hover:shadow-md'
              }`}
              variants={itemVariants}
              onClick={() => setSelectedClause(selectedClause === index ? null : index)}
            >
              <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 px-4 py-3 border-b flex justify-between items-center">
                <h3 className="font-semibold flex items-center">
                  <span className={`h-2 w-2 rounded-full mr-2 ${getRiskColorClass(clause.risk_level)}`}></span>
                  {clause.clause_type}
                </h3>
                <span className={`${getRiskBadgeClass(clause.risk_level)} px-3 py-1 rounded-full text-xs font-semibold shadow-sm`}>
                  {clause.risk_level} Risk
                </span>
              </div>
              
              <div className="p-4">
                <div className="mb-4">
                  <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">{clause.original_text}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center text-gray-800 dark:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        In Plain English:
                      </h4>
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                        {clause.simplified_summary}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center text-gray-800 dark:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Improvement Advice:
                      </h4>
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                        {clause.improvement_advice}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center text-gray-800 dark:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Suggested Rewording:
                      </h4>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
                        {clause.suggested_rewording}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center text-gray-800 dark:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        Key Terms:
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {clause.bert_insights.important_terms.slice(0, 5).map((term, i) => (
                          <span 
                            key={i} 
                            className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 shadow-sm"
                          >
                            {term}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {Object.keys(clause.bert_insights.term_alternatives).length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center text-gray-800 dark:text-gray-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                          Alternative Terms:
                        </h4>
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                          <dl className="space-y-2">
                            {Object.entries(clause.bert_insights.term_alternatives).map(([term, alternatives], i) => (
                              <div key={i}>
                                <dt className="font-medium text-sm text-gray-700 dark:text-gray-300">{term}:</dt>
                                <dd className="text-sm text-gray-600 dark:text-gray-400 pl-3">
                                  {alternatives.join(', ')}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ContractAnalysis;  