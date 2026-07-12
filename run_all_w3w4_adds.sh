#!/bin/bash
# Quick script to add all W3-W4 questions to the database
# Run this after manually reviewing and fixing any issues

echo "Adding W3D2-W4D5 questions to questions-science-p6.json..."
echo

# Run each script
for day in w3d2 w3d3 w3d4 w3d5 w4d1 w4d2 w4d3 w4d4 w4d5; do
    script="add_${day}.py"
    if [ -f "$script" ]; then
        echo "Running $script..."
        python3 "$script"
    else
        echo "Warning: $script not found"
    fi
done

echo
echo "Done! All questions added."
echo "Check questions-science-p6.json for the new questions."
