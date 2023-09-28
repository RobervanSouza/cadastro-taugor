 <div className={styles.foto}>
              <div className={styles.iconeFoto}>
                <TextField
                  label="Foto"
                  variant="outlined"
                  value={foto}
                  onChange={handleChange}
                  required
                  placeholder="link da Foto"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <div className={styles.icon}>
                        {imagemPlaceholder ? (
                          <img
                            src={imagemPlaceholder}
                            alt="Imagem"
                            className={styles.imgPla}
                          />
                        ) : (
                          <AccountBoxIcon className={styles.icon} />
                        )}
                      </div>
                    ),
                  }}
                />
              </div>
              <div className={styles.descFoto}>
                <label className={styles.uploadLabel}>
                  {escolherArquivo ? "Escolher arquivo" : "Colar link"}
                  <input
                    type={escolherArquivo ? "file" : "text"}
                    accept={escolherArquivo ? "image/*" : undefined}
                    className={styles.fileInput}
                    onChange={handleFileChange}
                  />
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={escolherArquivo}
                    onChange={() => setEscolherArquivo(!escolherArquivo)}
                  />
                  Escolher arquivo
                </label>
              </div>
            </div>