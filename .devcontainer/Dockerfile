FROM node:20.15-slim

RUN apt-get update && apt-get install -y libsox-dev wget bzip2 ca-certificates cmake sudo curl build-essential ffmpeg zip unzip git vim \
  && rm -rf /var/lib/apt/lists/*

# ユーザ権限の設定
ARG USERNAME=vscode
RUN useradd -m $USERNAME && \
  chsh -s /bin/bash $USERNAME && \
  echo "$USERNAME ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
USER $USERNAME
RUN curl -fsSL https://bun.sh/install | bash
RUN echo 'export PATH="$HOME/.local/bin:$HOME/.bun/bin:$PATH"' >> /home/$USERNAME/.bashrc

ENTRYPOINT ["tail", "-f", "/dev/null"]