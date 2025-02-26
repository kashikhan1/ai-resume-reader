"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  Upload,
  FileText,
  FileIcon as FilePdf,
  X,
  CheckCircle2,
  Zap,
  Search,
  MessageSquare,
  Lightbulb,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Textarea } from "@/components/ui/textarea";
 
interface FeedbackOptions {
  contentAnalysis: boolean;
  atsAnalysis: boolean;
  interviewSuggestions: boolean;
  suggestions: boolean;
}

export default function ResumePage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");

  const [feedbackOptions, setFeedbackOptions] = useState<FeedbackOptions>({
    contentAnalysis: true,
    atsAnalysis: true,
    interviewSuggestions: true,
    suggestions: true,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setError(null);
    setResult(null);
    setFile(file);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription); // Add Job Description
    // Add feedback options to the request
    Object.entries(feedbackOptions).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      const response = await fetch(`${process.env.BACKEND_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload file");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = () => {
    if (!file) return null;
    return file.name.endsWith(".pdf") ? (
      <FilePdf className="w-12 h-12 text-red-500" />
    ) : (
      <FileText className="w-12 h-12 text-blue-500" />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 dark:from-purple-900 dark:via-pink-900 dark:to-rose-900 p-4">
      <div className="container mx-auto w-full max-w-4xl">
        <motion.h1
          className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          AI Resume Reviewer
        </motion.h1>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-[300px_1fr]">
          <Card className="h-fit bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Review Options</CardTitle>
              <CardDescription>Customize your review feedback</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="contentAnalysis"
                  className="flex items-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Content Analysis
                </Label>
                <Switch
                  id="contentAnalysis"
                  checked={feedbackOptions.contentAnalysis}
                  onCheckedChange={(checked) =>
                    setFeedbackOptions((prev) => ({
                      ...prev,
                      contentAnalysis: checked,
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="atsAnalysis"
                  className="flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  ATS Analysis
                </Label>
                <Switch
                  id="atsAnalysis"
                  checked={feedbackOptions.atsAnalysis}
                  onCheckedChange={(checked) =>
                    setFeedbackOptions((prev) => ({
                      ...prev,
                      atsAnalysis: checked,
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="interviewSuggestions"
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Interview Suggestions
                </Label>
                <Switch
                  id="interviewSuggestions"
                  checked={feedbackOptions.interviewSuggestions}
                  onCheckedChange={(checked) =>
                    setFeedbackOptions((prev) => ({
                      ...prev,
                      interviewSuggestions: checked,
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="suggestions"
                  className="flex items-center gap-2"
                >
                  <Lightbulb className="w-4 h-4" />
                  Improvement Suggestions
                </Label>
                <Switch
                  id="suggestions"
                  checked={feedbackOptions.suggestions}
                  onCheckedChange={(checked) =>
                    setFeedbackOptions((prev) => ({
                      ...prev,
                      suggestions: checked,
                    }))
                  }
                />
              </div>
              <div>
                <Textarea
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full h-32"
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Upload Your Resume</CardTitle>
                <CardDescription>
                  Drag and drop your resume file or click to browse
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg transition-colors ${
                    isUploading
                      ? "border-primary bg-primary/5"
                      : "border-gray-300 hover:border-primary/50"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const file = e.dataTransfer.files[0];
                    if (file) handleFileUpload(file);
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />

                  <AnimatePresence>
                    {file ? (
                      <motion.div
                        className="flex flex-col items-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        {getFileIcon()}
                        <p className="mt-2 text-sm font-medium">{file.name}</p>
                        {isUploading && (
                          <div className="w-full max-w-xs mt-4">
                            <Progress value={uploadProgress} className="h-2" />
                            <p className="text-xs text-center mt-2">
                              {uploadProgress}%
                            </p>
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        className="flex flex-col items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        >
                          Select File
                        </Button>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PDF or DOCX (MAX. 5MB)
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {file && !isUploading && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setFile(null);
                        setResult(null);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>

            {result && (
              <Card className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    Review Complete
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="contentAnalysis" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      {feedbackOptions.contentAnalysis && (
                        <TabsTrigger value="contentAnalysis">
                          Content
                        </TabsTrigger>
                      )}
                      {feedbackOptions.atsAnalysis && (
                        <TabsTrigger value="atsAnalysis">ATS</TabsTrigger>
                      )}
                      {feedbackOptions.interviewSuggestions && (
                        <TabsTrigger value="interviewSuggestions">
                          Interview
                        </TabsTrigger>
                      )}
                      {feedbackOptions.suggestions && (
                        <TabsTrigger value="suggestions">
                          Suggestions
                        </TabsTrigger>
                      )}
                    </TabsList>
                    <div className="mt-4">
                      {feedbackOptions.contentAnalysis && (
                        <TabsContent value="contentAnalysis">
                          <div className="prose dark:prose-invert">
                            <MarkdownPreview
                              source={result?.contentAnalysis}
                              style={{ padding: 16 }}
                            />
                          </div>
                        </TabsContent>
                      )}
                      {feedbackOptions.atsAnalysis && (
                        <TabsContent value="atsAnalysis">
                          <div className="prose dark:prose-invert">
                            <MarkdownPreview
                              source={result?.atsAnalysis}
                              style={{ padding: 16 }}
                            />
                          </div>
                        </TabsContent>
                      )}
                      {feedbackOptions.interviewSuggestions && (
                        <TabsContent value="interviewSuggestions">
                          <div className="prose dark:prose-invert">
                            <MarkdownPreview
                              source={result?.interviewSuggestion}
                              style={{ padding: 16 }}
                            />
                          </div>
                        </TabsContent>
                      )}
                      {feedbackOptions.suggestions && (
                        <TabsContent value="suggestions">
                          <div className="prose dark:prose-invert">
                            <MarkdownPreview
                              source={result?.suggestions}
                              style={{ padding: 16 }}
                            />
                          </div>
                        </TabsContent>
                      )}
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
            )}
      </div>
    </div>
  )
}