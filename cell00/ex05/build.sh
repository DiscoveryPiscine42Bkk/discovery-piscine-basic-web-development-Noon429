if [$#-eq 0]; then
	echo "No arguments supplied"
else
	for folder in "$@"; do
		mkdir "ex$document"
	done
fi
