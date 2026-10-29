#!/bin/zsh

set +o histexpand

issue_labels=(
  123 "epic,frontend,backend,feature,storefront"
  124 "frontend,storefront,feature,ui"
)
          
for ((i = 1; i <= ${#issue_labels[@]}; i += 2)); do
  issue_id="${issue_labels[i]}"
  labels="${issue_labels[i+1]}"
  echo "🏷️  Updating labels for issue #$issue_id -> \"$labels\"..."
  gh issue edit "$issue_id" --add-label "$labels"
done

echo "✅ All labels applied!"
