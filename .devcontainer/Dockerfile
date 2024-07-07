FROM python:3.12

RUN apt-get update && apt-get install -y libsox-dev wget bzip2 ca-certificates cmake
# Minicondaのインストール
ENV CONDA_DIR /opt/conda
ENV PATH="/root/.bun/bin:$CONDA_DIR/bin:$PATH"
RUN wget --quiet https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O /tmp/miniconda.sh && \
  /bin/bash /tmp/miniconda.sh -b -p $CONDA_DIR && \
  rm /tmp/miniconda.sh && \
  $CONDA_DIR/bin/conda init

# Bunのインストール
RUN curl -fsSL https://bun.sh/install | bash

# 必要なパッケージのインストール
COPY apps/django-api/requirements.txt /tmp/requirements.txt
RUN pip install --upgrade pip && \
  pip install -r /tmp/requirements.txt && \
  rm /tmp/requirements.txt

# ユーザ権限の設定
ARG USERNAME=vscode
RUN useradd -m $USERNAME && \
  chown -R $USERNAME $CONDA_DIR /root/.bun && \
  chsh -s /bin/bash $USERNAME
USER $USERNAME
RUN $CONDA_DIR/bin/conda init