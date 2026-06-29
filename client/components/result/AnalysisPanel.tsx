'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { AnalyzeResponseDto, ShopperType } from "@/types";

interface AnalysisPanelProps {
  analysis?: AnalyzeResponseDto | null;
  loading?: boolean;
}

const SkeletonLoader = () => (
  <div className="space-y-6">
    {/* Shopper Type */}
    <div className="space-y-2">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-8 w-32" />
    </div>

    {/* Confidence */}
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-10" />
      </div>
      <Skeleton className="h-2 w-full" />
    </div>

    <Separator />

    {/* Evidence */}
    <div className="space-y-3">
      <Skeleton className="h-3 w-16" />
      <Card className="border-dashed bg-muted/20">
        <CardContent className="pt-4">
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-4 w-4 flex-shrink-0 rounded-full" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    <Separator />

    {/* Recommendation */}
    <div className="space-y-3">
      <Skeleton className="h-3 w-24" />
      <Card>
        <CardContent className="space-y-4 pt-4">
          <Skeleton className="h-5 w-48" />
          <div className="space-y-3">
            <div>
              <Skeleton className="h-3 w-24 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div>
              <Skeleton className="h-3 w-24 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
          <div className="bg-accent/50 rounded-md p-3">
            <Skeleton className="h-3 w-16 mb-2" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const getBadgeVariant = (shopperType: ShopperType) => {
  const variantMap: Record<ShopperType, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    [ShopperType.BROWSER]: 'secondary',
    [ShopperType.COMPARER]: 'default',
    [ShopperType.DISCOUNT_SEEKER]: 'destructive',
    [ShopperType.CART_ABANDONER]: 'outline',
    [ShopperType.LOYAL_CUSTOMER]: 'secondary',
  };
  return variantMap[shopperType];
};

export default function AnalysisPanel({ analysis, loading = false }: AnalysisPanelProps) {
  const hasAnalysis = analysis !== null && analysis !== undefined;
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>AI Analysis</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {loading ? (
          <SkeletonLoader />
        ) : !hasAnalysis ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-12">
            <Sparkles className="mb-3 h-8 w-8 text-muted-foreground/60" />
            <p className="text-sm font-medium">No analysis yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Build a shopper session and click Analyze Shopper.
            </p>
          </div>
        ) : (
          // Analysis Content
          <div className="space-y-6">
            {/* Shopper Type */}
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Shopper Type
              </p>
              <Badge
                variant={getBadgeVariant(analysis.shopperType)}
                className="text-sm font-semibold py-2 px-3"
              >
                {analysis.shopperType}
              </Badge>
            </div>

            {/* Confidence */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Confidence
                </p>
                <span className="text-sm font-semibold">{analysis.confidence}%</span>
              </div>
              <Progress value={analysis.confidence} className="h-2" />
            </div>

            <Separator />

            {/* Evidence */}
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Evidence
              </p>
              <Card className="border-dashed bg-muted/20">
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    {analysis.evidence.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Separator />

            {/* Recommendation */}
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Recommendation
              </p>
              <Card>
                <CardContent className="space-y-4 pt-4">
                  <div>
                    <h4 className="font-semibold">{analysis.recommendation.title}</h4>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Primary Action
                      </p>
                      <p className="text-sm">{analysis.recommendation.primaryAction}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Secondary Action
                      </p>
                      <p className="text-sm">{analysis.recommendation.secondaryAction}</p>
                    </div>
                  </div>

                  <div className="bg-accent/50 rounded-md p-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Reasoning
                    </p>
                    <p className="text-xs leading-relaxed">{analysis.recommendation.reasoning}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
